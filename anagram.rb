require 'sinatra'

get %r{/([\w-]+)/([\w-]+)} do
  @phrase, @anagram = params['captures'].map {|s| s.tr('-', ' ')}
  erb :index
end
