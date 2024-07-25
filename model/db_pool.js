//db connection
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  process.env.MYSQL_ADDON_DB,
  process.env.MYSQL_ADDON_USER,
  process.env.MYSQL_ADDON_PASSWORD,
  {
    host: process.env.MYSQL_ADDON_HOST,
    dialect: "mysql",
  }
);

const auth = async () => {
  try {
    await sequelize.authenticate();
    console.log("connection Successful");
  } catch (err) {
    console.log("error while connecting", err);
  }
};


auth();

const Patient = sequelize.define(
  "patients",
  {
    id: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    first_name: {
      type: Sequelize.DataTypes.STRING,
    },
    last_name: {
      type: Sequelize.DataTypes.STRING,
    },
    age: {
      type: Sequelize.DataTypes.INTEGER,
    },
    gender: {
      type: Sequelize.DataTypes.ENUM("Male", "Female", "Other"),
    },
    email: {
      type: Sequelize.DataTypes.STRING,
    },
    phone: {
      type: Sequelize.DataTypes.STRING(20),
    },
    address: {
      type: Sequelize.DataTypes.STRING,
    },
    city: {
      type: Sequelize.DataTypes.STRING(100),
    },
    state: {
      type: Sequelize.DataTypes.STRING(100),
    },
    country: {
      type: Sequelize.DataTypes.STRING(100),
    },
    postal_code: {
      type: Sequelize.DataTypes.STRING(20),
    },
    registration_date: {
      type: Sequelize.DataTypes.DATE,
    },
    password: {
      type: Sequelize.DataTypes.STRING,
    },
    resetPasswordToken: {
      type: Sequelize.DataTypes.STRING,
    },
    resetPasswordExpire: {
      type: Sequelize.DataTypes.DATE,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

const Doctor = sequelize.define(
  "doctor",
  {
    id: {
      type: Sequelize.DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.DataTypes.STRING(255),
      allowNull: false,
    },
    specialization: {
      type: Sequelize.DataTypes.STRING(255),
      allowNull: false,
    },
    experience_years: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
    },
    contact_number: {
      type: Sequelize.DataTypes.STRING(20),
      allowNull: true,
    },
    email: {
      type: Sequelize.DataTypes.STRING(255),
      allowNull: true,
    },
    address: {
      type: Sequelize.DataTypes.STRING(255),
      allowNull: true,
    },
    password: {
      type: Sequelize.DataTypes.STRING(255),
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

const Admin = sequelize.define(
  "admin",
  {
    id: {
      type: Sequelize.DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    username: {
      type: Sequelize.DataTypes.STRING(255),
      allowNull: false,
    },
    password: {
      type: Sequelize.DataTypes.STRING(255),
      allowNull: false,
    },
    email: {
      type: Sequelize.DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    created_at: {
      type: Sequelize.DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

const Appointment = sequelize.define(
  "appointments",
  {
    appointment_id: {
      type: Sequelize.DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    patient_id: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
    },
    doctor_id: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
    },
    appointment_date: {
      type: Sequelize.DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: Sequelize.DataTypes.ENUM("Scheduled", "Cancelled", "Completed"),
      defaultValue: "Scheduled",
      allowNull: true,
    },
    created_at: {
      type: Sequelize.DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
    updated_at: {
      type: Sequelize.DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      onUpdate: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

const Message = sequelize.define(
  "message",
  {
    id: {
      type: Sequelize.DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    first_name: {
      type: Sequelize.DataTypes.STRING(255),
      allowNull: false,
    },
    last_name: {
      type: Sequelize.DataTypes.STRING(255),
      allowNull: false,
    },
    age: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: true,
    },
    gender: {
      type: Sequelize.DataTypes.ENUM("Male", "Female"),
      allowNull: true,
    },
    message: {
      type: Sequelize.DataTypes.STRING(255),
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

const Sync = async () => {
  try {
    await sequelize.sync({ force: false });
    console.log("syncing successful");
  } catch (err) {
    console.log("error in syncing", err);
  }
};

Sync();

module.exports = {
  Patient,
  Doctor,
  Admin,
  Appointment,
  Message,
  Sync,
};
