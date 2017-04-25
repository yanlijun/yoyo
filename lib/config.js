const config = {
  sysCode: 'FC',
  domain: 'fc.17shihui.com',
  menus: [
    {
      code: 'statements',
      name: '结算中心',
      icon: 'iconfont icon-jiaoyijiesuanzhongxin',
      is_menu: 1,
      items: [
        {
          code: 'statements_account',
          name: '账户资金管理',
          icon: 'fa fa-circle-o',
          is_menu: 1,
          items: [
            {
              code: 'statements_account_cash',
              name: '现金账号',
              is_menu: 1,
              url: '/statements',
            },
            {
              code: 'statements_apply',
              name: '账户请求',
              is_menu: 0,
              url: '/statements/apply',
            },
            {
              code: 'statements_success',
              name: '提交成功',
              is_menu: 0,
              url: '/statements/success',
            },
            {
              code: 'statements_charge',
              name: '充值',
              is_menu: 0,
              url: '/statements/charge',
            },
            {
              code: 'statements_withdrawals',
              name: '提现',
              is_menu: 0,
              url: '/statements/withdrawals',
            },
          ],
        },
        {
          code: 'statements_reconciliation',
          name: '收款对账',
          is_menu: 1,
          icon: 'fa fa-circle-o',
          items: [
            {
              code: 'statements_reconciliation_home',
              name: '到家服务对账',
              is_menu: 1,

              url: '/statements/reconciliation/home',
            },
            {
              code: 'statements_reconciliation_home_detail',
              name: '到家服务对账明细',
              is_menu: 1,
              url: '/statements/reconciliation/home/detail',
            },
            {
              code: 'statements_reconciliation_goods',
              name: '商品服务对账',
              is_menu: 1,
              url: '/statements/reconciliation/goods',
            },
            {
              code: 'statements_reconciliation_goods_detail',
              name: '商品服务对账明细',
              is_menu: 1,
              url: '/statements/reconciliation/goods/detail',
            },
          ],
        },
        {
          name: '特卖付款对账',
          code: 'specialPayCheck',
          is_menu: 1,
          icon: 'fa fa-circle-o',
          items: [
            {
              code: 'agencySale.list',
              name: '经销对账',
              url: '/iframe/trading/agencySale/list',
              icon: 'fa fa-circle-o',
              is_menu: '1',
            }, {
              code: 'distributorSale.list',
              name: '包销对账',
              is_active: '1',
              url: '/iframe/trading/distributorSale/list',
              icon: 'fa fa-circle-o',
              is_menu: '1',
            }, {
              code: 'proxySale.list',
              name: '服务协议对账',
              is_active: '1',
              url: '/iframe/trading/proxySale/list',
              icon: 'fa fa-circle-o',
              is_menu: '1',
            },
          ],
        },

      ],
    },
    {
      code: 'reset_paypassword',
      url: '/reset/paypassword',
      name: '修改密码',
      is_menu: 0,
    },
    {
      code: 'reset_phone',
      url: '/reset/phone',
      name: '充值密码',
      is_menu: 0,
    },
    {
      code: 'forget_paypassword',
      url: '/forget/paypassword',
      name: '忘记密码',
      is_menu: 0,
    },
    {

      code: 'ucenter',
      name: '基础管理',
      icon: 'iconfont icon-jichudangan',
      is_menu: 1,
      items: [
        {
          code: 'sysconfig',
          name: '系统设置',
          icon: 'fa fa-circle-o',
          is_menu: 1,
          items: [
            {
              code: 'depart',
              name: '组织机构管理',
              url: '/iframe/passport/Organization',
              is_menu: 1,
              buttons: [
                {
                  code: 'depart_add',
                  name: '新增',
                  is_menu: 0,
                }, {
                  code: 'depart_modify',
                  name: '修改',
                  is_menu: 0,
                }, {

                  code: 'import_service_center',
                  name: '服务社导入',
                  is_menu: 0,
                }, {

                  code: 'export_service_center',
                  name: '导入出服务社',
                  is_menu: 0,
                }],
            },
            {
              code: 'sysfunction',
              name: '系统功能定义',
              url: '/iframe/passport/System_function',
              is_menu: 1,
              icon: 'fa fa-circle-o',
              buttons: [
                {

                  code: 'sysfunction_add',
                  name: '新增',
                  is_menu: 0,
                }, {

                  code: 'sysfunction_modify',
                  name: '修改',

                  is_menu: 0,
                }, {

                  code: 'sysfunction_delete',
                  name: '删除',
                  is_menu: 0,
                }],
            },
          ],
        },
        {
          code: 'user_manage',
          name: '账号管理',
          icon: 'fa fa-circle-o',
          is_menu: 1,
          items: [
            {
              code: 'user_list',
              name: '账号列表',
              url: '/iframe/passport/user',
              is_menu: 1,
              buttons: [
                {
                  code: 'user_search',
                  name: '搜索',
                  is_menu: 0,
                },
                {
                  code: 'user_modify',
                  name: '编辑',
                  is_menu: 0,
                },
                {
                  code: 'user_add_btn',
                  name: '新增账号',
                  is_menu: 0,
                },
                {
                  code: 'user_import',
                  name: '导入账号',
                  is_menu: 0,
                },
                {
                  code: 'user_disable',
                  name: '禁用/启用',
                  is_menu: 0,
                },
              ],
            },
            {
              code: 'user_add',
              name: '新增账号',
              url: '/iframe/passport/user/add',
              is_menu: 1,
            },
            {
              code: 'service_center_user_list',
              name: '服务中心账号列表',
              url: '/iframe/passport/ServiceCenterUser/index',
              is_menu: 1,
              buttons: [
                {
                  code: 'service_center_user_list_search',
                  name: '搜索',
                  is_menu: 0,
                },
                {
                  code: 'service_center_user_list_modify',
                  name: '编辑',

                  is_menu: 0,
                },
                {

                  code: 'service_center_user_list_add_btn',
                  name: '新增账号',

                  is_menu: 0,
                },
                {

                  code: 'service_center_user_list_import',
                  name: '导入账号',
                  is_menu: 0,
                },
                {
                  code: 'service_center_user_list_disable',
                  name: '禁用/启用',
                  is_menu: 0,
                }],
            },
            {

              code: 'service_center_user_add',
              name: '添加服务中心账号',
              url: '/iframe/passport/ServiceCenterUser/add',
              is_menu: 1,
            },
          ],
        },
        {

          code: 'role',
          name: '角色管理',
          icon: 'fa fa-circle-o',
          is_menu: 1,
          items: [{
            code: 'role_list',
            name: '角色列表',
            url: '/iframe/passport/Role',
            is_menu: 1,
            buttons: [
              {

                code: 'role_search',
                name: '搜索',

                is_menu: 0,
              }, {

                code: 'role_add',
                name: '新增角色',
                is_menu: 0,
              }, {

                code: 'role_edit',
                name: '编辑',
                is_menu: 0,
              },
            ],
          }, {
            code: 'role_new',
            name: '新增角色',
            url: '/iframe/passport/Role/add',
            icon: '1',
            is_menu: 1,
          }],
        },
        {
          code: 'user_group',
          name: '账号组管理',
          icon: 'fa fa-circle-o',
          is_menu: 1,
          items: [
            {
              code: 'group_list',
              name: '账号组列表',
              is_menu: 1,
              url: '/iframe/passport/user_group',
              buttons: [
                {

                  code: 'group_search',
                  name: '搜索',
                  is_menu: 0,
                },
                {
                  code: 'group_add',
                  name: '新增账号组',
                  is_menu: 0,
                },
                {
                  code: 'group_add_user',
                  name: '添加账号',
                  is_menu: 0,
                },
                {
                  code: 'group_edit',
                  name: '编辑',
                  is_menu: 0,
                },
              ],
            },
            {
              code: 'user_group_add',
              name: '新增账号组',
              url: '/iframe/passport/user_group/add',
              is_menu: 1,
            },

          ],
        },
      ],
    },
    {
      name: '客户管理',
      is_menu: 1,
      icon: 'iconfont icon-kehuduanku',
      code: 'customer',
      items: [
        {
          name: '客户档案列表',
          url: '/customer/list/',
          code: 'customer_list',
          is_menu: 1,
        },
        {
          name: '客户属性维护',
          url: '/customer/attribute/',
          code: 'customer_attribute',
          is_menu: 1,
        },
      ],
    },
  ],
}
module.exports = config
