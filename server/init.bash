
# setting up tables

# sequelize model:generate --name user \
# --attributes firstName:string,lastName:string,email:string,password:string

# sequelize model:generate --name friendsRelations \
# --attributes userID:integer,friendUserID:integer

sequelize model:generate --name myBooks \
--attributes userID:integer,bookID:integer,lendTo:integer


# sequelize model:generate --name lendingBooks \
# --attributes bookID:integer,lendTo:integer,ownedBy:integer

# sequelize model:generate --name booksTable \
# --attributes title:string,author:string,category:string,isbn:integer