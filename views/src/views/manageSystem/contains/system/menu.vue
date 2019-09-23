<script>
    export default {
        props: {
            active: String,
            navMenu: Array
        },
        render(h) {
            return (
                <el-menu default-active={ this.active } router theme="dark" class="el-menu-vertical-demo sidebar">
                    {
                        this.navMenu.map((menu) => {
                            if (Object.prototype.hasOwnProperty.call(menu, 'children') === false) {
                                if (menu.permit === true) {
                                    return (
                                        <el-menu-item index={ menu.index }>
                                            <i class={ menu.icon }></i>{ menu.name }
                                        </el-menu-item>
                                    );
                                }
                            } else {
                                if (menu.permit === true) {
                                    return (
                                        <el-submenu index={ menu.index }>
                                            <template slot="title"><i class={ menu.icon }></i>{ menu.name }</template>
                                            {
                                                menu.children.map((subMenu) => {
                                                    if (subMenu.permit === true) {
                                                        return (
                                                            <el-menu-item index={ subMenu.index }>{ subMenu.name }</el-menu-item>
                                                        )
                                                    }
                                                })
                                            }
                                        </el-submenu>
                                    );
                                }
                            }
                        })
                    }
                </el-menu>
            );
        }
    }
</script>
