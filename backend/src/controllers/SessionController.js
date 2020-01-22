// index, show, store, update, destroy
const User = require('../models/User');


module.exports = {
  async store(req, res) {
    const { email } = req.body;
    
    //busca o usuário pra checar se já existe no banco
    let user = await User.findOne({ email });
    
    // se não existir, cria um novo usuário com esse email
    if(!user) {
      user = await User.create({ email });
    }

    return res.json(user);
  }
};