let request_id=todo_id
let request_key=todo_key
let total=0
let passed=0
echo "" | cat > output.txt
for i in `ls ./0*`
do
  echo "==== $i ====" | cat >> output.txt 
  sh $i >> output.txt
  if [ $? == 0 ]
  then
    echo "Test passed $i" | cat >> output.txt
    let passed++
  else 
    echo "Test failed $i" | cat >> output.txt
  fi
  let total++
done
echo "========" | cat >> output.txt
echo "Passed : $passed" | cat >> output.txt
echo "Total : $total" | cat >> output.txt
curl -F filename="output.txt" -F upload=@output.txt "https://questbook.io/testrunner/hook?request_id=$request_id&request_key=$request_key"