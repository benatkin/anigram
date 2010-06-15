require 'sinatra'

get '/' do
  redirect '/anagram-animation/a-giant-airman-moan', 307
end

get %r{/([\w-]+)/([\w-]+).*} do
  @phrase, @anagram = params['captures'].map {|s| s.tr('-', ' ')}
  erb :index
end
