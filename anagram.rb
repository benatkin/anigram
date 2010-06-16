require 'sinatra'

get '/' do
  redirect '/television-programming', 307
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
    'clenching thin topsoil' => 'linchpin technologist',
    'television programming' => 'permeating living rooms'
  }[@phrase]
  erb :index
end

