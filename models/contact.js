module.exports = function(sequelize, DataTypes) {
    var Contact = sequelize.define("Contact", {
        contact_id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            nontEmpty: true
        },
        message: {
            type: DataTypes.STRING,
            nontEmpty: true
        },
    },
        {
            timestamps: true,            
        }
    );
    return Contact;
};