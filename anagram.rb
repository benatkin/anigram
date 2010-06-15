require 'sinatra'

get '/' do
  redirect '/anagram-animation/a-giant-airman-moan', 307
end

get %r{/([\w-]+)/([\w-]+).*} do
  @phrase, @anagram = params['captures'].map {|s| s.tr('-', ' ')}
  erb :index
end

get %r{/([\w-]+).*} do
  @phrase = params['captures'][0].tr('-', ' ')
  @anagram = {
    'hashrocket' => 'hot hackers',
    'benjamin atkin' => 'beatnik ninja',
    'clenching thin topsoil' => 'linchpin technologist'
  }[@phrase]
  erb :index
end

