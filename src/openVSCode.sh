#!/bin/bash
##################################################
# 快速打开VSCode（可配合Sourcetree自定义使用）
# 运行脚本：/bin/bash
# 参数：/Users/gengjian/Documents/ProjectShell/openVSCode.sh $REPO $FILE $SHA
# ${0} 脚本地址
# ${1} 仓库地址
# ${2} 选中文件名称
# ${3} 版本commit
##################################################

echo "=====快速打开VSCode脚本====="
echo "0 ${0}"
echo "1 ${1}"
echo "2 ${2}"
echo "3 ${3}"

cd $1
/Applications/Visual\ Studio\ Code.app/Contents/Resources/app/bin/code .