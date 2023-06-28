const Sequelize = require("sequelize");

/**
 * Actions summary:
 *
 * createTable() => "PlanProductions", deps: [Users, Products, Products, Users]
 * addColumn(user_id) => "Localisations"
 * addColumn(UserId) => "Localisations"
 * addColumn(id_organisation) => "Users"
 * addColumn(OrganisationId) => "Users"
 *
 */

const info = {
  revision: 2,
  name: "review_tables",
  created: "2023-06-28T14:00:48.397Z",
  comment: "",
};

const migrationCommands = (transaction) => [
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
        dateDebu: { type: Sequelize.DATE, field: "dateDebu" },
        semmence: { type: Sequelize.DATE, field: "semmence" },
        croissance: { type: Sequelize.DATE, field: "croissance" },
        recolte: { type: Sequelize.DATE, field: "recolte" },
        conditionnement: { type: Sequelize.DATE, field: "conditionnement" },
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
    fn: "addColumn",
    params: [
      "Localisations",
      "user_id",
      {
        type: Sequelize.INTEGER,
        onUpdate: "CASCADE",
        onDelete: "NO ACTION",
        references: { model: "Users", key: "id" },
        allowNull: true,
        field: "user_id",
      },
      { transaction },
    ],
  },
  {
    fn: "addColumn",
    params: [
      "Localisations",
      "UserId",
      {
        type: Sequelize.INTEGER,
        field: "UserId",
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
        references: { model: "Users", key: "id" },
        allowNull: true,
      },
      { transaction },
    ],
  },
  {
    fn: "addColumn",
    params: [
      "Users",
      "id_organisation",
      {
        type: Sequelize.INTEGER,
        onUpdate: "CASCADE",
        onDelete: "NO ACTION",
        references: { model: "Organisations", key: "id" },
        allowNull: true,
        field: "id_organisation",
      },
      { transaction },
    ],
  },
  {
    fn: "addColumn",
    params: [
      "Users",
      "OrganisationId",
      {
        type: Sequelize.INTEGER,
        field: "OrganisationId",
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
        references: { model: "Organisations", key: "id" },
        allowNull: true,
      },
      { transaction },
    ],
  },
];

const rollbackCommands = (transaction) => [
  {
    fn: "removeColumn",
    params: ["Localisations", "user_id", { transaction }],
  },
  {
    fn: "removeColumn",
    params: ["Localisations", "UserId", { transaction }],
  },
  {
    fn: "removeColumn",
    params: ["Users", "id_organisation", { transaction }],
  },
  {
    fn: "removeColumn",
    params: ["Users", "OrganisationId", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["PlanProductions", { transaction }],
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
