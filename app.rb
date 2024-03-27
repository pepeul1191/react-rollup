require 'json'
require 'sinatra'
require 'dotenv'
require 'sequel'
require 'jwt'

# db
DB = Sequel.sqlite('db/app.db')
User = Class.new(Sequel::Model(DB[:users]))

# sinatra configs
SECRET_KEY = 'your_secret_key'
Dotenv.load('.env')
set :public_folder, File.dirname(__FILE__) + '/public'
set :views, File.dirname(__FILE__) + '/views'
set :port, 3000 
set :show_exceptions, false

helpers do
  def set_global_variable(value)
    @ENV = ENV
  end
end

before do
  headers['server'] = 'Ruby, Ubuntu'
end

# 404
get '/error/access/404' do
  erb :'404'
end

not_found do
  case request.env['REQUEST_METHOD']
  when 'GET'
    extensions = ['css', 'js', 'png', ]
    path = request.path.split('.')
    if !extensions.include? path[path.length - 1]
      redirect '/error/access/404' if request.path_info != '/error/access/404'
    end
  else
    status 404
    'Recurso no encontrado'
  end
end

# endpoints
post '/user/validate' do
  # request
  request.body.rewind
  payload = JSON.parse(request.body.read)
  # do
  resp = {}
  status_code = 200
  user_name = payload['user']
  password = payload['password']
  begin
    user = User.where(user: user_name, password: password).first
    if user
      payload = {
        user_id: user.id, 
        created: Time.now,
        updated: nil
      }
      token = JWT.encode(payload, SECRET_KEY, 'HS256')
      # respnse
      content_type :json
      resp['message'] = token
      resp['status'] = 'sucess' 
    else
      status_code = 404
      resp['message'] = 'Usuario no encontrado'
      resp['status'] = 'error-404' 
    end
  rescue => e
    # Manejar excepción
    puts "Error: #{e.message}"
    resp['message'] = 'Error al validar el usuario'
    resp['status'] = 'error-500'
  end
  # response
  return resp.to_json
end

post '/user/login-check' do
  # request
  token = request.env['HTTP_AUTHORIZATION']&.split(' ')&.last
  # do
  resp = {}
  if token
    begin
      # Decodificar y verificar el token JWT
      decoded_token = JWT.decode(token, SECRET_KEY, true, algorithm: 'HS256')
      created = decoded_token[0]['created']
      updated = decoded_token[0]['updated']
      # check time difference to check if token is valid or not, max 1 minute
      second_diff = 0
      if updated == nil then
        second_diff = (Time.now - Time.parse(created)).to_i
      else
        second_diff = (Time.now - Time.parse(updated)).to_i
      end
      minutes_diff = second_diff / 60
      valid = false
      if minutes_diff <= 1 then
        valid = true
      end
      resp = {message: valid, status: 'success'}
    rescue JWT::DecodeError
      puts "Error: #{e.message}"
      resp = {message: 'Error al decodificar el token', status: 'error'}
    end
  else
    resp = {message: 'Error, token no valido', status: 'error'}
  end
  # response
  puts resp
  return resp.to_json
end

# views
get [
  '/login',
  '/sign-in',
  '/reset-password',
  '/new-password/success'
] do
  locals = {title: 'Login'}
  erb :login, locals: locals
end

[ 
  '/', 
  '/about', 
  '/contact', 
].each do |path|
  get path do
    erb :home
  end
end
