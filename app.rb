require 'sinatra'

set :public_folder, File.dirname(__FILE__) + '/public'
set :views, File.dirname(__FILE__) + '/views'

get '/' do
  erb :home
end