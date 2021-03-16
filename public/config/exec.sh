#!/bin/bash
sudo apt update
OUT=$?
if [ $OUT -eq 0 ];then
   echo "300"
else
   echo "400"
fi
sudo apt -y install salt-minion
OUT=$?
if [ $OUT -eq 0 ];then
   echo "200 install salt-minion success"
else
   echo "400 install salt-minion failed"
fi
cp minion /etc/salt/minion
OUT=$?
if [ $OUT -eq 0 ];then
   echo "200 copy minion to /etc/salt/minion success"
else
   echo "400 copy minion to /etc/salt/minion failed"
fi
hostname
echo `hostname`