module.exports.confirm = function *(context) {
    context.$confirm('此操作将删除当前记录，是否继续？', '请确认', {confirmButtonText:'确定', cancelButtonText: '取消', type: 'warning'})
        .then(() => {
            console.log('trying to delete');
        }).catch(() => {
            console.log('Cancel delete...');
        });
};