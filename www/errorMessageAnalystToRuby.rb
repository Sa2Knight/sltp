# encoding : utf-8
def	getErrorDataToRuby(input)
	matcheFlag = false
	pythonReg = /sltp.rb:([0-9]+):in/
	input.scan(reg[lang]) do |matche|
		matcheFlag = true
		puts $1
		puts "error"
	end
	puts input if matcheFlag === false
end

input = File.read("result.txt")
getErrorDataToRuby(input)