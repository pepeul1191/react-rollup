require 'sinatra'

set :public_folder, File.dirname(__FILE__) + '/public'
set :views, File.dirname(__FILE__) + '/views'

[ 
  '/', 
  '/about', 
  '/contact', 
].each do |path|
  get path do
    erb :home
  end
end