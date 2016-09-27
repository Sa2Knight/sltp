# encoding : utf-8
def	getErrorDataToPHP(errMes)
	pythonReg = /sltp.rb:([0-9]+):in/
	errMes.scan(reg[lang]) do |matche|
			 puts $1
			 puts "error"
	end
end

input = File.read("result.txt")
getErrorDataToPHP(input)

