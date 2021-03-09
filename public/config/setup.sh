sudo apt -y install salt-minion12
OUT=$?
if [ $OUT -eq 0 ];then
   echo "Install successfully"
else
   echo "failure"
fi
cp minion /etc/salt/minion
OUT=$?
if [ $OUT -eq 0 ];then
   echo "successfully"
else
   echo "failure"
fi