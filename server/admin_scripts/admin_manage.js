const mongoose = require("mongoose");
mongoose.connect(
  "mongodb://localhost:27017/BookManagementWebApp",
  {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
  },
  (err) => {
    if (!err) return console.info("connection established to mongodb");
    console.error("Error occurred while connecting to db " + err);
  }
);

const adminModel = require("../models/admin");

function parseArgs(args) {
  const [, , command, ...options] = args;
  const parsedoptions = options.reduce((cum, elm) => {
    const [optionName, optionValue] = elm.split("=");
    cum[optionName] = optionValue;
    return cum;
  }, {});
  parsedoptions.command = command;
  return parsedoptions;
}

async function addAdmin(options, next) {
  if (!options.email || !options.password) {
    console.log("Error: email or password is missing!");
    return;
  }

  const admin = new adminModel({
    email: options.email,
    password: options.password,
  });

  try {
    const saved_admin = await admin.save();
    console.log("saved_admin: ", saved_admin);
    process.exit(0);
  } catch (error) {
    console.log(error);
    console.log("could not save admin --> error");
    process.exit(0);
  }
}

function main(cmdArgs) {
  // parse args first
  const parsedArgs = parseArgs(cmdArgs);

  console.log("args: ", parsedArgs);

  switch (parsedArgs.command) {
    case "add":
      addAdmin(parsedArgs);
      return;

    default:
      console.log("command not valid!");
      return;
  }
}

main(process.argv);

// ---------------------------------
// example:
// ➜ node admin_manage.js add email=atef@atef.com password=12345678

