require 'sinatra'

set :public_folder, File.dirname(__FILE__) + '/public'
set :views, File.dirname(__FILE__) + '/views'

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

[ 
  '/', 
  '/about', 
  '/contact', 
].each do |path|
  get path do
    erb :home
  end
end