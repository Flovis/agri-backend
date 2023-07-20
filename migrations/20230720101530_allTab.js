const Sequelize = require("sequelize");

/**
 * Actions summary:
 *
 * createTable() => "Content_Categories", deps: []
 * createTable() => "Cycles", deps: []
 * createTable() => "Languages", deps: []
 * createTable() => "Organisations", deps: []
 * createTable() => "Products", deps: []
 * createTable() => "Tags", deps: []
 * createTable() => "Users", deps: [Organisations, Organisations]
 * createTable() => "Contents", deps: [Content_Categories, Languages, Cycles, Products]
 * createTable() => "Localisations", deps: [Users]
 * createTable() => "ConfigProductions", deps: [Contents, Products, Cycles]
 * createTable() => "Configs", deps: [Contents, Content_Categories, Contents]
 * createTable() => "Content_Tags", deps: [Tags, Contents]
 * createTable() => "ConfigMeteos", deps: [Users, Contents, Products, Cycles, Organisations]
 * createTable() => "Audiences", deps: [Products, Organisations, Localisations]
 * createTable() => "Farmes", deps: [Users, Organisations, Organisations, Users]
 * createTable() => "Roles", deps: [Organisations, Organisations]
 * createTable() => "PlanProductions", deps: [Users, Products, Products, Users]
 * createTable() => "User_Roles", deps: [Users, Roles]
 *
 */

const info = {
  revision: 1,
  name: "allTab",
  created: "2023-07-20T10:15:30.453Z",
  comment: "",
};

const migrationCommands = (transaction) => [
  {
    fn: "createTable",
    params: [
      "Content_Categories",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        category_name: { type: Sequelize.STRING, field: "category_name" },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "Cycles",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        name: { type: Sequelize.STRING, field: "name" },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "Languages",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        name: { type: Sequelize.STRING, field: "name" },
        iso_code: { type: Sequelize.STRING, field: "iso_code" },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "Organisations",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        name: { type: Sequelize.STRING, field: "name" },
        description: { type: Sequelize.STRING, field: "description" },
        address: { type: Sequelize.STRING, field: "address" },
        localisation: { type: Sequelize.STRING, field: "localisation" },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "Products",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        name: { type: Sequelize.STRING, field: "name" },
        photo: { type: Sequelize.STRING, field: "photo" },
        type: { type: Sequelize.STRING, field: "type" },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "Tags",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        tag_name: { type: Sequelize.STRING, field: "tag_name" },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "Users",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        username: { type: Sequelize.STRING, field: "username" },
        password: { type: Sequelize.STRING, field: "password" },
        email: { type: Sequelize.STRING, field: "email" },
        first_name: { type: Sequelize.STRING, field: "first_name" },
        last_name: { type: Sequelize.STRING, field: "last_name" },
        date_of_birth: { type: Sequelize.DATE, field: "date_of_birth" },
        gender: { type: Sequelize.STRING, field: "gender" },
        phone_number: { type: Sequelize.STRING, field: "phone_number" },
        adress: { type: Sequelize.STRING, field: "adress" },
        state_province: { type: Sequelize.STRING, field: "state_province" },
        country: { type: Sequelize.STRING, field: "country" },
        city: { type: Sequelize.STRING, field: "city" },
        profile_picture: { type: Sequelize.STRING, field: "profile_picture" },
        account_status: { type: Sequelize.STRING, field: "account_status" },
        last_login_time: { type: Sequelize.DATE, field: "last_login_time" },
        id_organisation: {
          type: Sequelize.INTEGER,
          onUpdate: "CASCADE",
          onDelete: "NO ACTION",
          references: { model: "Organisations", key: "id" },
          allowNull: true,
          field: "id_organisation",
        },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
        OrganisationId: {
          type: Sequelize.INTEGER,
          field: "OrganisationId",
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
          references: { model: "Organisations", key: "id" },
          allowNull: true,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "Contents",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        titre: { type: Sequelize.STRING, field: "titre" },
        file: { type: Sequelize.STRING, field: "file" },
        link: { type: Sequelize.STRING, field: "link" },
        description: { type: Sequelize.STRING, field: "description" },
        contentText: { type: Sequelize.TEXT, field: "contentText" },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
        ContentCategoryId: {
          type: Sequelize.INTEGER,
          field: "ContentCategoryId",
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
          references: { model: "Content_Categories", key: "id" },
          allowNull: true,
        },
        LanguageId: {
          type: Sequelize.INTEGER,
          field: "LanguageId",
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
          references: { model: "Languages", key: "id" },
          allowNull: true,
        },
        CycleId: {
          type: Sequelize.INTEGER,
          field: "CycleId",
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
          references: { model: "Cycles", key: "id" },
          allowNull: true,
        },
        ProductId: {
          type: Sequelize.INTEGER,
          field: "ProductId",
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
          references: { model: "Products", key: "id" },
          allowNull: true,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "Localisations",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        name: { type: Sequelize.STRING, field: "name" },
        latitude: { type: Sequelize.STRING, field: "latitude" },
        longitude: { type: Sequelize.STRING, field: "longitude" },
        UserId: {
          type: Sequelize.INTEGER,
          onUpdate: "CASCADE",
          onDelete: "NO ACTION",
          references: { model: "Users", key: "id" },
          allowNull: true,
          field: "UserId",
        },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "ConfigProductions",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        ContentId: {
          type: Sequelize.INTEGER,
          onUpdate: "CASCADE",
          onDelete: "NO ACTION",
          references: { model: "Contents", key: "id" },
          allowNull: true,
          field: "ContentId",
        },
        ProductId: {
          type: Sequelize.INTEGER,
          onUpdate: "CASCADE",
          onDelete: "NO ACTION",
          references: { model: "Products", key: "id" },
          allowNull: true,
          field: "ProductId",
        },
        CycleId: {
          type: Sequelize.INTEGER,
          onUpdate: "CASCADE",
          onDelete: "NO ACTION",
          references: { model: "Cycles", key: "id" },
          allowNull: true,
          field: "CycleId",
        },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "Configs",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        canal: { type: Sequelize.STRING, field: "canal" },
        idContent: {
          type: Sequelize.INTEGER,
          onUpdate: "CASCADE",
          onDelete: "NO ACTION",
          references: { model: "Contents", key: "id" },
          allowNull: true,
          field: "idContent",
        },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
        ContentCategoryId: {
          type: Sequelize.INTEGER,
          field: "ContentCategoryId",
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
          references: { model: "Content_Categories", key: "id" },
          allowNull: true,
        },
        ContentId: {
          type: Sequelize.INTEGER,
          field: "ContentId",
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
          references: { model: "Contents", key: "id" },
          allowNull: true,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "Content_Tags",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
        TagId: {
          type: Sequelize.INTEGER,
          field: "TagId",
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
          references: { model: "Tags", key: "id" },
          allowNull: true,
        },
        ContentId: {
          type: Sequelize.INTEGER,
          field: "ContentId",
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
          references: { model: "Contents", key: "id" },
          allowNull: true,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "ConfigMeteos",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        UserId: {
          type: Sequelize.INTEGER,
          onUpdate: "CASCADE",
          onDelete: "NO ACTION",
          references: { model: "Users", key: "id" },
          allowNull: true,
          field: "UserId",
        },
        ContentId: {
          type: Sequelize.INTEGER,
          onUpdate: "CASCADE",
          onDelete: "NO ACTION",
          references: { model: "Contents", key: "id" },
          allowNull: true,
          field: "ContentId",
        },
        ProductId: {
          type: Sequelize.INTEGER,
          onUpdate: "CASCADE",
          onDelete: "NO ACTION",
          references: { model: "Products", key: "id" },
          allowNull: true,
          field: "ProductId",
        },
        CycleId: {
          type: Sequelize.INTEGER,
          onUpdate: "CASCADE",
          onDelete: "NO ACTION",
          references: { model: "Cycles", key: "id" },
          allowNull: true,
          field: "CycleId",
        },
        OrganisationId: {
          type: Sequelize.INTEGER,
          onUpdate: "CASCADE",
          onDelete: "NO ACTION",
          references: { model: "Organisations", key: "id" },
          allowNull: true,
          field: "OrganisationId",
        },
        date: { type: Sequelize.DATE, field: "date" },
        canal: { type: Sequelize.STRING, field: "canal" },
        condition: { type: Sequelize.STRING, field: "condition" },
        message: { type: Sequelize.STRING, field: "message" },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "Audiences",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        ProductId: {
          type: Sequelize.INTEGER,
          onUpdate: "CASCADE",
          onDelete: "NO ACTION",
          references: { model: "Products", key: "id" },
          allowNull: true,
          field: "ProductId",
        },
        OrganisationId: {
          type: Sequelize.INTEGER,
          onUpdate: "CASCADE",
          onDelete: "NO ACTION",
          references: { model: "Organisations", key: "id" },
          allowNull: true,
          field: "OrganisationId",
        },
        LocalisationId: {
          type: Sequelize.INTEGER,
          onUpdate: "CASCADE",
          onDelete: "NO ACTION",
          references: { model: "Localisations", key: "id" },
          allowNull: true,
          field: "LocalisationId",
        },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "Farmes",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        name: { type: Sequelize.STRING, field: "name" },
        location: { type: Sequelize.STRING, field: "location" },
        address: { type: Sequelize.STRING, field: "address" },
        size: { type: Sequelize.STRING, field: "size" },
        user_id: {
          type: Sequelize.INTEGER,
          onUpdate: "CASCADE",
          onDelete: "NO ACTION",
          references: { model: "Users", key: "id" },
          allowNull: true,
          field: "user_id",
        },
        id_organisation: {
          type: Sequelize.INTEGER,
          onUpdate: "CASCADE",
          onDelete: "NO ACTION",
          references: { model: "Organisations", key: "id" },
          allowNull: true,
          field: "id_organisation",
        },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
        OrganisationId: {
          type: Sequelize.INTEGER,
          field: "OrganisationId",
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
          references: { model: "Organisations", key: "id" },
          allowNull: true,
        },
        UserId: {
          type: Sequelize.INTEGER,
          field: "UserId",
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
          references: { model: "Users", key: "id" },
          allowNull: true,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "Roles",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        name: { type: Sequelize.STRING, field: "name" },
        slug: { type: Sequelize.STRING, field: "slug" },
        type: { type: Sequelize.STRING, field: "type" },
        id_organisation: {
          type: Sequelize.INTEGER,
          onUpdate: "CASCADE",
          onDelete: "NO ACTION",
          references: { model: "Organisations", key: "id" },
          allowNull: true,
          field: "id_organisation",
        },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
        OrganisationId: {
          type: Sequelize.INTEGER,
          field: "OrganisationId",
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
          references: { model: "Organisations", key: "id" },
          allowNull: true,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "PlanProductions",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        dateDebut: { type: Sequelize.DATEONLY, field: "dateDebut" },
        semence: { type: Sequelize.DATEONLY, field: "semence" },
        croissance: { type: Sequelize.DATEONLY, field: "croissance" },
        recolte: { type: Sequelize.DATEONLY, field: "recolte" },
        condition: { type: Sequelize.DATEONLY, field: "condition" },
        status: { type: Sequelize.INTEGER, field: "status" },
        user_id: {
          type: Sequelize.INTEGER,
          onUpdate: "CASCADE",
          onDelete: "NO ACTION",
          references: { model: "Users", key: "id" },
          allowNull: true,
          field: "user_id",
        },
        product_id: {
          type: Sequelize.INTEGER,
          onUpdate: "CASCADE",
          onDelete: "NO ACTION",
          references: { model: "Products", key: "id" },
          allowNull: true,
          field: "product_id",
        },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
        ProductId: {
          type: Sequelize.INTEGER,
          field: "ProductId",
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
          references: { model: "Products", key: "id" },
          allowNull: true,
        },
        UserId: {
          type: Sequelize.INTEGER,
          field: "UserId",
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
          references: { model: "Users", key: "id" },
          allowNull: true,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "User_Roles",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        UserId: {
          type: Sequelize.INTEGER,
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          references: { model: "Users", key: "id" },
          allowNull: true,
          field: "UserId",
        },
        RoleId: {
          type: Sequelize.INTEGER,
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          references: { model: "Roles", key: "id" },
          allowNull: true,
          field: "RoleId",
        },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
];

const rollbackCommands = (transaction) => [
  {
    fn: "dropTable",
    params: ["Audiences", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["ConfigMeteos", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["ConfigProductions", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["Configs", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["Content_Categories", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["Content_Tags", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["Contents", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["Cycles", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["Farmes", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["Languages", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["Localisations", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["Organisations", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["PlanProductions", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["Products", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["Roles", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["Tags", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["Users", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["User_Roles", { transaction }],
  },
];

const pos = 0;
const useTransaction = true;

const execute = (queryInterface, sequelize, _commands) => {
  let index = pos;
  const run = (transaction) => {
    const commands = _commands(transaction);
    return new Promise((resolve, reject) => {
      const next = () => {
        if (index < commands.length) {
          const command = commands[index];
          console.log(`[#${index}] execute: ${command.fn}`);
          index++;
          queryInterface[command.fn](...command.params).then(next, reject);
        } else resolve();
      };
      next();
    });
  };
  if (useTransaction) return queryInterface.sequelize.transaction(run);
  return run(null);
};

module.exports = {
  pos,
  useTransaction,
  up: (queryInterface, sequelize) =>
    execute(queryInterface, sequelize, migrationCommands),
  down: (queryInterface, sequelize) =>
    execute(queryInterface, sequelize, rollbackCommands),
  info,
};
