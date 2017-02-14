var _ = require("lodash");

module.exports = {
	html(req, res) {
		res.view("index");
	},
	test(req, res) {
		var data1 = req.param("my_param1");
		var data2 = req.param("my_param2");

		var params = [];

		params.push(data1);
		params.push(data2);

		res.json({result: "success", params: params});
	},
	socketLogin(req, res) {
		var socket = req.socket;
		var socketId = sails.sockets.getId(socket);

		sails.sockets.join(socketId, "testSocketRoom");

		res.json({result: "success"});
	},
	notify(req, res) {
		var message = req.body.message;

		sails.sockets.broadcast("testSocketRoom", "notify", message);

		res.json({result: "success"});
	},
	someQueryRequest(req, res) {
		var data1 = req.param("data1");
		var data2 = req.param("data2");

		MariaDb(function*(conn) {
			var result = yield conn.query("INSERT INTO tb_some_table ...", {data1: data1, data2: data2});
			var id = result.insertId;

			var result = yield conn.query("SELECT * FROM tb_some_table WHERE id = :id", {id: id});
			return result;
		}).then(
			r => res.json({result: "success"}),
			err => res.serverError(err)
		);
	}
};
