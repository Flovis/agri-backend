const Sequelize = require("sequelize");

/**
 * Actions summary:
 *
 * removeColumn(tag_id) => "Content_Tags"
 * addColumn(ContentId) => "Content_Tags"
 *
 */

const info = {
  revision: 3,
  name: "allTabRev2",
  created: "2023-07-04T11:42:35.316Z",
  comment: "",
};

const migrationCommands = (transaction) => [
  {
    fn: "removeColumn",
    params: ["Content_Tags", "tag_id", { transaction }],
  },
  {
    fn: "addColumn",
    params: [
      "Content_Tags",
      "ContentId",
      {
        type: Sequelize.INTEGER,
        field: "ContentId",
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
        references: { model: "Contents", key: "id" },
        allowNull: true,
      },
      { transaction },
    ],
  },
];

const rollbackCommands = (transaction) => [
  {
    fn: "removeColumn",
    params: ["Content_Tags", "ContentId", { transaction }],
  },
  {
    fn: "addColumn",
    params: [
      "Content_Tags",
      "tag_id",
      {
        type: Sequelize.INTEGER,
        onUpdate: "CASCADE",
        onDelete: "NO ACTION",
        references: { model: "Tags", key: "id" },
        allowNull: true,
        field: "tag_id",
      },
      { transaction },
    ],
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
