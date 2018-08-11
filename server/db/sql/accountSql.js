module.exports = {
  findAll:'select * from list_account',
  getAccountById:'select * from list_account where id = ?',
  getAccountByUsername:'select * from list_account where user_name = ?',
  getRandomAccount:'select * from list_account where status ="free" order by update_time limit 1',
  insert:'insert into list_account(user_name,password) values(?,?)',
  insertList:'insert into list_account(user_name,password) values ?',
  updateById:'update list_account set user_name = ?,password = ? where id = ? ',
  updateStatusAndTime:'update list_account set status = "occupied",update_time = current_timestamp where id = ? ',
  deleteById:'delete from list_account where id = ?',
};

//status: free occupied