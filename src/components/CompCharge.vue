<template>
    <div class="charge">
        <div class="charge_back">
            <button @click.stop.prevent="$router.push('/')"><i class="fas fa-arrow-left"></i></button>
        </div>
        <div class="charge_content">
            <div class="content_left">
                <div class="left_1">
                    <div class="left_1_1">
                        <div class="user_name">
                            <p class="txt_name"><i class="fas fa-user-circle"></i></p>
                        </div>
                    </div>
                    <div class="left_1_2">
                        <div class="left_1_2_1">
                            <p class="store_credit"></p>
                            <p class="txt"></p>
                        </div>
                        <div class="left_1_2_2">
                            <p class="account_balance"></p>
                            <p class="txt"></p>
                        </div>
                    </div>
                </div>
                <div class="left_2"></div>
                <div class="left_3">
                    <div class="sub_total">
                        <div class="sub_total_1">
                            <p class="sub_total_1_1"></p>
                            <p class="txt"></p>
                        </div>
                    </div>
                    <div div class="tax">
                        <div class="tax_1">
                            <p class="tax_1_1"></p>
                            <p class="txt"></p> 
                        </div>
                    </div>
                    <div class="discount">
                        <div class="discount_1">
                            <p class="discount_1_1"></p>
                            <p class="txt"></p> 
                        </div>
                    </div>
                    <div class="grand_total">
                        <div class="grand_total_1">
                            <p class="grand_total_1_1"></p>
                            <p class="txt"></p> 
                        </div>
                    </div>
                </div>
            </div>
            <div class="content_right">
                <div class="right_1">
                    <div class="right_1_1">

                    </div>
                    <div class="right_1_2"></div>
                    <div class="right_1_3"></div>
                </div>
                <div class="right_2">
                    <button class="complete"></button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Charge',
    data: function(){
        return {

        }
    },
    created: function(){
        console.log(this.$parent)
    }
}
</script>

<style>

</style>