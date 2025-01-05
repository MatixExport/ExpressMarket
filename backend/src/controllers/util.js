
const getByIdOr404 = async (res,pk,repo)=>{
    const obj = await repo.findByPk(pk);
    if (!obj) {
        const msg = `Record with pk ${pk} not found.`;
        res.error(msg);
    }
    return obj
}

module.exports = {getByIdOr404}




