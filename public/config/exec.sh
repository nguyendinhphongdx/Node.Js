sudo apt update
OUT=$?
echo "$OUT"

sudo apt -y install salt-minion
OUT=$?
echo "$OUT"
if [ $OUT -eq 0 ];then
   echo "200 install salt-minion success"
else
   echo "400 install salt-minion failed"
   exit
fi
sleep 5
cp minion /etc/salt/minion
OUT=$?
if [ $OUT -eq 0 ];then
   echo "200 copy minion to /etc/salt/minion success"
else
   echo "400 copy minion to /etc/salt/minion failed"
fi
# addition(){

#    sum=$(($1+$2))

#    return $sum

# }

# read -p "Enter a number: " int1

# read -p "Enter a number: " int2

# addition $int1 $int2

# echo "The result is : " $?

