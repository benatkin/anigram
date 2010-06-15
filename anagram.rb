require 'sinatra'

get '/' do
  redirect '/anagram-animation/a-giant-airman-moan', 307
end

get '/hashrocket' do
  @phrase, @anagram = 'hashrocket', 'hot hackers'
  erb :index
end

get '/benjamin-atkin' do
  @phrase, @anagram = 'benjamin atkin', 'beatnik ninja'
  erb :index
end

get %r{/([\w-]+)/([\w-]+).*} do
  @phrase, @anagram = params['captures'].map {|s| s.tr('-', ' ')}
  erb :index
end
