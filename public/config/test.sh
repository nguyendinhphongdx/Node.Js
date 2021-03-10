sudo apt -y install salt-minion
OUT=$?
if [ $OUT -eq 0 ];then
   echo "200"
else
   echo "400"
fi
cp minion /etc/salt/minion
OUT=$?
if [ $OUT -eq 0 ];then
   echo "200"
else
   echo "400"
fi
