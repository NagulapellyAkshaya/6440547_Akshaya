@echo off
echo Creating output directory...
mkdir out

echo Compiling com.utils module...
javac -d out --module-source-path . com.utils/module-info.java com.utils/com/utils/Utility.java

echo Compiling com.greetings module...
javac -d out --module-source-path . --module-path out com.greetings/module-info.java com.greetings/com/greetings/Main.java

echo Running the program...
java --module-path out --module com.greetings/com.greetings.Main

pause
