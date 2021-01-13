#!/bin/bash


# build docker image
docker build --no-cache -t ${imageName}:${tag} .


checkDocker() {
  RUNNING=$(docker inspect --format="{{ .State.Running }}" ${containerName} 2>/dev/null)
  if [ -z $RUNNING ];then
    echo "${containerName} does not exist."
    return 1
  fi
  # 如果 RUNNING 的状态是 false, 说明 {containerName} 没有被运行
  if [ "$RUNNING" == "false" ]; then
    matching=$(docker ps -a --filter="name=${containerName}" -q | xargs)
    if [ -n $matching ]; then
      docker rm $matching
    fi
    return 2
  else
    echo "${containerName} is running."
    matchingStarted=$(docker ps --filter="name=${containerName}" -q | xargs)
    if [ -n $matchingStarted ]; then
      docker stop $matchingStarted
      docker rm ${containerName}
    fi
  fi
}

checkDocker


# run docker image

docker run -itd --name ${containerName} -p ${port}:12005 ${imageName}:${tag}

echo "docker run -itd --name ${containerName} -p ${port}:12005 ${imageName}:${tag}"
