require 'json'
require 'sinatra'
require 'dotenv'

Dotenv.load('.env')
set :public_folder, File.dirname(__FILE__) + '/public'
set :views, File.dirname(__FILE__) + '/views'
set :port, 3000 

helpers do
  def set_global_variable(value)
    @ENV = ENV
  end
end

before do
  headers['server'] = 'Ruby, Ubuntu'
end

get '/error/access/404' do
  erb :'404'
end

not_found do
  case request.env['REQUEST_METHOD']
  when 'GET'
    extensions = ['css', 'js', 'png', ]
    path = request.path.split('.')
    if !extensions.include? path[path.length - 1]
      redirect '/error/access/404' if request.path_info != "/error/access/404"
    end
  else
    status 404
    'Recurso no encontrado'
  end
end

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

post '/user/validate' do
  # request
  request.body.rewind
  payload = JSON.parse(request.body.read)
  puts '1 ++++++++++++++++++++++++++++++++++++++++++'
  puts payload
  puts '2 ++++++++++++++++++++++++++++++++++++++++++'
  # Procesar el payload
  # Aquí puedes realizar cualquier acción necesaria con los datos recibidos
  # do

  # respnse
  content_type :json
  { message: "¡Payload recibido correctamente!" }.to_json
end