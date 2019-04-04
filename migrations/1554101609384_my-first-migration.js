exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable("company", {
      company_id: "id",
      company_code: { type: "varchar(50)", notNull: true },
      company_name: { type: "varchar(100)", notNull: true },
      company_address: { type: "text", notNull: false, default:null },
      parent_id: { type: "integer", notNull: false, default:null },
      is_deleted: { type: "boolean", notNull: true, default:false },
      created_at: {
        type: "timestamp",
        notNull: true,
        default: pgm.func("current_timestamp")
      }
    });
    pgm.createTable("employee", {
      employee_id: "id",
      employee_email: { type: "varchar(200)", notNull: true, unique:true },
      employee_id_no: { type: "integer", notNull: true, unique:true},
      employee_name: { type: "varchar(200)", notNull: true },
      employee_phone: { type: "varchar(20)", notNull: false, default:null },
      is_deleted: { type: "boolean", notNull: true, default:false },
      created_at: {
        type: "timestamp",
        notNull: true,
        default: pgm.func("current_timestamp")
      }
    });
    pgm.createTable("company_employee", {
        company_employee_id: "id",
        company_id: { type: "integer", notNull: true},
        employee_id: { type: "integer", notNull: true},
        division: { type: "varchar(100)", notNull: false, default:null},
        job_position: { type: "varchar(200)", notNull: false, default:null},
        join_date: { type: "date", notNull: false, default:null},
        resign_date: { type: "date", notNull: false, default:null},
        created_at: {
          type: "timestamp",
          notNull: true,
          default: pgm.func("current_timestamp")
        }
    });
    pgm.createTable("employee_partner", {
        employee_partner_id: "id",
        employee_id_request: { type: "integer", notNull: true},
        employee_id_approved: { type: "integer", notNull: true},
        status: { type: "integer", notNull: true, default:"0"},
        created_at: {
          type: "timestamp",
          notNull: true,
          default: pgm.func("current_timestamp")
        }
    });
    pgm.createIndex("company", "company_code");
    pgm.createIndex("employee", "employee_id_no");
    pgm.createIndex("employee_partner", "employee_id_request");
    pgm.createIndex("employee_partner", "employee_id_approved");
  };

exports.down = (pgm) => {
    pgm.dropTable("company");
    pgm.dropTable("employee");
    pgm.dropTable("company_employee");
    pgm.dropTable("employee_partner");
};
