##################################################
# 切换git账号脚本
# main
# $0 执行文件
# $1 type: string 'github' | 
#                 'gitlab'
# 示例
# ./switchGit.sh gitlab
##################################################

TYPE_SWITCH="${1}"
USER_NAME=""
USER_EMAIL=""

if [[ "${TYPE_SWITCH}" == "github" ]]; then
  USER_NAME="gengjian1203"
  USER_EMAIL="gengjian1203@foxmail.com"
elif [[ "${TYPE_SWITCH}" == "gitlab" ]]; then
  USER_NAME="gengjian"
  USER_EMAIL="gengjian@aaa.com"
fi

if [[ "${USER_NAME}" != "" &&  "${USER_EMAIL}" != "" ]]; then
  git config --global user.name ${USER_NAME}
  git config --global user.email ${USER_EMAIL}
  echo "git切换切换为：${USER_NAME} - ${USER_EMAIL}"
  git config -l
else
  echo "切换类型：${1} 非正常参数。请确认后重试"
fi

exit