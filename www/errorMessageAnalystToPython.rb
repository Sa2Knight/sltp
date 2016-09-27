# encoding : utf-8
def	getErrorDataToPython(errMes)
	pythonReg = /File "sltp.py", line ([0-9]+)/
	errMes.scan(reg[lang]) do |matche|
			 puts $1
			 puts "error"
	end
end

input = File.read("result.txt")
getErrorDataToPython(input)
