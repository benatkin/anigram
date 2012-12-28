$:.unshift(File.expand_path(File.dirname(__FILE__)))
require 'anagram'

run Sinatra::Application

