const Controller = require("../controller");
const UserModel = require('../../models/user');
const goodsModel = require('../../models/goods');
const CollegueModel = require('../../models/collegue');
const TimeDataModel = require('../../models/timeData');
const CashierRecordModel = require('../../models/cashierRecord');
const TurnoverModel = require('../../models/turnover');
const { Upload } = require('../../function/upload');
const md5 = require("../../function/md5");
const jwt = require("jsonwebtoken");
const secret = "aaa";

class ApiController extends Controller {
    constructor() {
        super();
        this.RouterFunctionName = [
            ['get', '/login', 'login', '登录功能', true],
            ['get', '/showGoods', 'showGoods', '展示商品', true],
            ['post', '/addGoods', 'addGoods', '添加商品', true],
            ['post', '/upload', 'upload', '添加商品图片', true],
            ['get', '/addCollegue', 'addCollegue', '添加员工', true],
            ['post', '/deleteOneCollegue', 'deleteOneCollegue', '删除员工', true],
            ['get', '/collegueList', 'collegueList', '员工列表', true],
            ['get', '/timeData', 'timeData', '事件', true],
            ['get', '/getTimeData', 'getTimeData', '获取事件', true],
            ['post', '/deleteOneTimeData', 'deleteOneTimeData', '删除一个事件', true],
            ['get', '/updateGoodsInventory', 'updateGoodsInventory', '更新商品库存', true],
            ['post', '/cashierRecord', 'cashierRecord', '添加收银记录', true],
            ['post', '/updateGoods', 'updateGoods', '更新商品', true],
            ['get', '/getCashierRecord', 'getCashierRecord', '获取收银记录', true],
            ['post','/computeTurnover','computeTurnover','计算本月分类营业额',true],
            ['get','/getTurnover','getTurnover','获取本月分类营业额',true]
        ]
    }
    login() {
        let fields = md5(this.ctx.req.query);
        if (!fields) {
            this.ctx.res.json({ code: 201, message: '请输入正确信息' });
        }
        let { username, password } = this.ctx.req.query
        let token = jwt.sign(fields, secret, { expiresIn: '1 days' });
        // console.log(username,password);
        UserModel.findOne({ username }).then(result => {
            if (result != null && password == result.password) {
                this.ctx.res.json({ code: 200, message: '登录成功', result: { token } });
            } else {
                this.ctx.res.json({ code: 201, message: '请输入正确信息' });
            }
        })
        // UserModel.insertMany({username, password},(err,data)=>{
        //     if(err){
        //         throw Error(err);
        //     }else{
        //         console.log(data);
        //     }
        // });
    }
    showGoods() {
        goodsModel.find().then((result) => {
            this.ctx.res.json({ code: 200, message: '获取成功', result })
        })
    }
    addGoods() {
        let bodyData = this.ctx.req.body;
        let data = {};
        for (let key in bodyData) {
            data = JSON.parse(key);
        }
        goodsModel.insertMany(data)
    }
    upload() {
        Upload(this.ctx.req, (err, data) => {
            if (err) {
                this.ctx.res.json({ code: 201 });
            } else {
                this.ctx.res.json(data)
            }
        })
        // console.log(this.ctx.req)
    }
    collegueList() {
        CollegueModel.find().then(result => {
            // console.log(result);
            this.ctx.res.json({ code: 200, message: '请求成功', result })
        })
    }
    addCollegue() {
        const data = this.ctx.req.query;
        // console.log(data);
        const { name, position, number, phoneNumber, address, isShow } = data;
        CollegueModel.insertMany({ name, position, number, phoneNumber, address, isShow }, (err, result) => {
            if (err) {
                throw Error(err);
                return;
            } else {
                // console.log(result);
                this.ctx.res.json({ code: 200, message: '添加成功', result });
            }
        });
    }
    deleteOneCollegue() {
        let { _id } = this.ctx.req.body;
        let data = this.ctx.req.body;
        data.isShow = 'false';
        CollegueModel.updateOne({ _id }, data, (err, result) => {
            if (err) {
                throw Error(err);
                return;
            } else {
                this.ctx.res.json({ code: 200, message: '操作成功', result });
            }
        })
    }
    timeData() {
        const data = this.ctx.req.query;
        const { name, number, event, addTime, isShow } = data;
        console.log(data);
        TimeDataModel.insertMany({ name, number, event, addTime, isShow }, (err, result) => {
            if (err) {
                throw Error(err);
                return;
            } else {
                this.ctx.res.json({ code: 200, message: '添加成功', result });
            }
        })
    }
    getTimeData() {
        TimeDataModel.find().then(result => {
            this.ctx.res.json({ code: 200, message: '操作成功', result });
        })
    }
    deleteOneTimeData() {
        let data = this.ctx.req.body;
        let { _id } = data;
        data.isShow = 'false'
        // console.log(data);
        TimeDataModel.updateOne({ _id }, data, (err, result) => {
            if (err) {
                throw Error(err);
                return;
            } else {
                // console.log(result);
                this.ctx.res.json({ code: 200, message: '操作成功', result });
            }
        })
        // console.log(data);
    }
    updateGoodsInventory() {
        let goodsMessage = JSON.parse(this.ctx.req.query.goodsMessage);
        // console.log(goodsMessage)
        // console.log(typeof JSON.parse(goodsMessage))
        let finalResult = null;
        for (let i = 0; i < goodsMessage.length; i++) {
            let goodsNumber = goodsMessage[i]['number']
            goodsMessage[i]['count'] = parseInt(goodsMessage[i]['count']) - 1;
            goodsMessage[i]['count'] = String(goodsMessage[i]['count']);
            // console.log(goodsMessage[i])
            // console.log(goodsNumber)
            goodsModel.updateOne({ number: goodsNumber }, goodsMessage[i], (err, result) => {
                if (err) {
                    throw Error(err);
                    return;
                } else {
                    // console.log(result);
                    // this.ctx.res.json({ code: 200, message: '操作成功', result })
                    finalResult = result;
                }
            })
        }
        this.ctx.res.json({code: 200, message: '操作成功', finalResult})
    }
    updateGoods() {
        let goodsMessage = this.ctx.req.body;
        let data = null;
        goodsModel.findOne({ number: goodsMessage.number }, (err, result) => {
            if (err) {
                throw Error(err);
                return;
            } else {
                data = result
                data.time = goodsMessage.time;
                data.count = parseInt(data.count) + parseInt(goodsMessage.count);
                goodsModel.updateOne({ number: goodsMessage.number }, data, (err, result) => {
                    if (err) {
                        throw Error(err);
                        return;
                    } else {
                        this.ctx.res.json({ code: 200, message: '操作成功', result })
                    }
                })
            }
        })
    }
    cashierRecord() {
        let cashierMessage = this.ctx.req.body;
        let data = {};
        for (let key in cashierMessage) {
            data = JSON.parse(key);
        }
        // console.log(data)
        CashierRecordModel.insertMany(data)
    }
    getCashierRecord() {
        CashierRecordModel.find().then(result => {
            this.ctx.res.json({ code: 200, result });
        })
    }
    computeTurnover(){
        let goodsMessage = this.ctx.req.body;
        // console.log(goodsMessage);
        let data = {};
        for (let key in goodsMessage) {
            data = JSON.parse(key);
        }
        for(let i=0; i<data.length;i++){
            let name = data[i].name
            TurnoverModel.findOne({ name }).then( result => {
                // console.log(result);
                if(result === null){
                    TurnoverModel.insertMany(data[i]);
                }else{
                    result.cartCount += data[i].cartCount;
                    let number = result.number;
                    TurnoverModel.updateOne({ number }, result, data=>{
                        console.log(data);
                    });
                }
            })
        }
    }
    getTurnover(){
        TurnoverModel.find().then(result => {
            // console.log(result);
            this.ctx.res.json({code: 200, message: '操作成功', result});
        })
    }
}
module.exports = ApiController;