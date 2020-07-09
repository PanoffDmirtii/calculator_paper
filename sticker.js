<style>
[name="custom_w"],[name="custom_h"], [name="custom_count"] {
    margin-bottom:30px;
    padding: 0 20px;
    color: #000;
    border: 1px solid #000;
    background-color: #fff;
    font-size: 16px;
    font-weight: 400;
    height: 30px;
    width: 100px;
}
[name="custom_w"] {
    margin-right: 30px;
}

.notice, .notice_count {
    font-size: 11px;
    font-family: arial;
    width: 180px;
    margin-top: 15px;
    line-height: 1.4em;
    color: #ababab;
    border-bottom: 1px solid #ffee00;
    padding-bottom: 20px;
}
#form200424072 label {
    display: flex;
}

#form200424072 {
border: 1px solid #ffee00;
padding: 20px;
border-radius: 7px;
}

#form200424072 label small{
min-width: 60px;
max-width: 80px;
text-align: right;
margin-left: auto;
}

</style>
<script>

    $(document).ready(function() {
    
        
        let calcState = {
            printing_price: 0,
            material_price: 0,
            value_size: 0,
            value_count: 0,
            count_in_m2: 0,
            cut_count: 0,
            value_printing: 0,
            value_material: 0,
            custom_width: 0,
            custom_height: 0,
            discount: 0,
            profit: 0,
            calc_total_no_discount:0,
            showNotice: false,
            base_count: 0,
            rotate_count: 0,
            count_width: 0,
            count_height: 0,

        };    
        
    const usd = '70'
    
    const poster = {'price': 100 + 330, 'measure': 'm²', 'currency': 'RUB',
        'calc_values':{
            // 'material_film': {'id': 1, 'value': 'Плёнка 3551', 'price': 330, 'measure': 'm²', 'currency': 'RUB'},
            'material': [
                {'id': 1, 'value': 'Матовая', 'price': 300, 'measure': 'm²', 'currency': 'RUB'},
                {'id': 2, 'value': 'Глянцевая', 'price': 300, 'measure': 'm²', 'currency': 'RUB'},
                {'id': 3, 'value': 'Без ламината', 'price': 0, 'measure': 'm²', 'currency': 'RUB'},
            ],
            'printing': [
                {'id': 1, 'value': 'Печать 720 dpi', 'price': 1 * usd, 'measure': 'm²', 'currency': 'USD'},
                {'id': 2, 'value': 'Печать 1140 dpi', 'price': ((1 * usd) * 20) / 100 + (1 * usd), 'measure': 'm²', 'currency': 'USD'},
            ],
            'size_cutting': [
                {'id': 1, 'value':'50 х 50', 'width': 400, 'height': 600},
                {'id': 2, 'value':'100 х 100', 'width': 500, 'height': 700},
                {'id': 3, 'value':'150 х 150', 'width': 700, 'height': 1000},
                {'id': 4, 'value':'custom', 'width': '', 'height': ''},
            ],
            'counts': [
                {'id': 1, 'value':'50', 'profit': 2.5, 'discount': 0},
                {'id': 2, 'value':'100', 'profit': 2.3,'discount': 10},
                {'id': 3, 'value':'300', 'profit': 2.1,'discount': 15},
                {'id': 4, 'value':'500', 'profit': 2,'discount': 25},
                {'id': 5, 'value':'custom', 'profit': 1.8, 'discount': 50},
            ],
            'paper_size': 1000,
        }
    }
        
        // dev
        
        // $('.tn-elem__1953933431591463700386 > div').append(
        // `<ul>
        // <li class='val_printing'></li>
        // <li class='val_material'></li>
        // <li class='val_size_w'></li>
        // <li class='val_size_h'></li>
        // <li class='val_count'></li>
        // <li class='val_m2'></li>
        // <li class='val_cut'></li>
        // <li class='val_discount'></li>
        // <li class='val_total'></li>
        
        // // </ul>`)
        // $('#form195393343 > div.t-form__inputsbox > input[type=text]:nth-child(7)').append(
        // `<p class='val_total'></p>`)
        
        function updateViewCustomSize(w, h) {
            // визуализация состояния (dev)
            $('.val_size_w').text(`Ширина: ${w}`)
            $('.val_size_h').text(`Высота: ${h}`)
        }
        
        function updateStateCustomSize(w, h) {
            // обновление состояние, необходимо для расчётов
            calcState.custom_width = w
            calcState.custom_height = h
            updateViewCustomSize(w, h) // можно закомментить
        }
        
        
        function setCustomSize(){
            // получение значений размера из label
            let checked_value = $('[name="list_size_items"]:checked').val().match(/\d+/ig)
            $('[name="custom_w"]').val(checked_value[0])
            $('[name="custom_h"]').val(checked_value[1])
            updateStateCustomSize(checked_value[0], checked_value[1])

        }
        
        
        function hideCustomSize() {
            // скрытие кастомных input у размера
            $('[name="custom_w"]').attr('type', 'hidden')
            $('[name="custom_h"]').attr('type', 'hidden')
        }
        
        function showCustomSize() {
            // показать кастомные input для размера
            $('[name="custom_w"]').attr('type', 'text')
            $('[name="custom_h"]').attr('type', 'text')
            $('[name="custom_w"]').attr('placeholder', 'Ширина')
            $('[name="custom_h"]').attr('placeholder', 'Высота')
        }
        
        
        //  ###Количество
        
        function updateViewCustomCount(count) {
            // визуализация состояния (dev)
            $('.val_count').text(`Количество: ${count}`)
        }
        
        function updateStateCustomCount(count) {
            // обновление состояние, необходимо для расчётов
            calcState.value_count = Number(count)
            updateViewCustomCount(count) // можно закомментить
        }
        
        function setCustomCount(){
            // 
            let checked_value = $('[name="list_counts"]:checked').val()
            $('[name="custom_count"]').val(checked_value) 
            updateStateCustomCount(checked_value)
        }
        
        function hideCustomCount() {
            // скрытие кастомных input у количества
            $('[name="custom_count"]').attr('type', 'hidden')
        }
        
        function showCustomCount() {
            // показать кастомный input для количества
            $('[name="custom_count"]').attr('type', 'text')
            $('[name="custom_count"]').attr('placeholder', 'Количество')
        }
        
        
        
        
        // тип печати
        function updateViewPrinting(printing, printing_price) {
            // визуализация состояния (dev)
            $('.val_printing').text(`Тип печати: ${printing} *** Цена:${printing_price}`)
        }


        function updateStatePrinting(printing) {
            // обновление состояние, необходимо для расчётов
            calcState.value_printing = printing
            
            for (let i = 0; i < poster.calc_values.printing.length; i++) { 
                if (poster.calc_values.printing[i].value === printing) {
                    let printing_price = poster.calc_values.printing[i].price
                    calcState.printing_price = printing_price
                    updateViewPrinting(printing, printing_price)
                }
            }
        }
        
        function setPrinting(){
            // 
            let checked_value = $('[name="list_printing"]:checked').val()
            updateStatePrinting(checked_value)
        }
        
        // тип материала
        function updateViewMaterial(material, material_price) {
            // визуализация состояния (dev)
            $('.val_material').text(`Тип печати: ${material} *** Цена:${material_price}`)
        }


        function updateStateMaterial(material) {
            // обновление состояние, необходимо для расчётов
            calcState.value_material = material
            
            for (let i = 0; i < poster.calc_values.material.length; i++) { 
                if (poster.calc_values.material[i].value === material) {
                    let material_price = poster.calc_values.material[i].price
                    calcState.material_price = material_price
                    updateViewMaterial(material, material_price)
                }
            }
        }
        
        function setMaterial(){
            // 
            let checked_value = $('[name="list_material"]:checked').val()
            updateStateMaterial(checked_value)
        }


        function createDisAndPrice() {
            // добавление тегов к радио кнопка выбора количества 
            for (let i = 0; i < poster.calc_values.counts.length; i++) {
                let dis = document.createElement('small')  
                let t_dis = document.createElement('small')

                dis.setAttribute("class", `discount_${i}`)
                dis.style.cssText = "color: #07c400;"; 
                t_dis.setAttribute("class", `total_discount_${i}`)
                $('[name="list_counts"]').parent()[i].append(dis, t_dis)
            }
        }


        setTimeout(function() {
                setCustomSize()
                setCustomCount()
                setPrinting()
                setMaterial()
                calcTotal()
                setCountDiscount()
                createDisAndPrice()
                $('[data-input-lid="1591418830214"]').append(`<p class="notice"></p>`)
            $('[data-input-lid="1591418881412"]').append(`<p class="notice_count"></p>`)

                }, 2000);
        


    function drawAndCalcCut(count, show_preview) {
        
            
        let m2 = 1000 / 10
        let width = calcState.custom_width / 10;
        let height = calcState.custom_height / 10;
        let cut = 100

        if (show_preview) {
            $('.m2 div').remove();
            $('.stat ul').remove();
        }
        // Отрисовка раскладок в м2
        
        let position_top;
        let position_left;

        function posterAdd(w, h){
            if (show_preview) {
                $('.m2').append(
                    `<div 
                        class="poster" 
                        style="
                              width: ${w}px; 
                              height:${h}px; 
                              background: red; 
                              border: 1px solid #fff; 
                              position: absolute;
                              left: ${position_left}px; 
                              top: ${position_top}px;
                              box-sizing: border-box;
                              -moz-box-sizing: border-box;
                              -webkit-box-sizing: border-box;"
                ></div>`)
            }
        }
        
        function countInM2Width() {
            //сколько больше войдёт в 1 ряд по горизонтали / width
            let max_count_horizontal_width;
            for (let i = 0; i < count; i++) {
                if(width * (i + 1) <= m2) {
                } else {
                    max_count_horizontal_width = i
                    break;
                }
            }
        
        
            //сколько больше войдёт в 1 ряд по вертикали / width
            let max_count_vertical_width;
            for (let i = 0; i < count; i++) {
                if(height * (i + 1) <= m2) {
                } else {
                    max_count_vertical_width = i
                    break;
                }
            }
            
            let countWidth = {
                'width':max_count_horizontal_width, 
                'height':max_count_vertical_width, 
                'base_count':max_count_horizontal_width * max_count_vertical_width
            }
            return countWidth
        }
        
        
        function countInM2Height() {
            //сколько больше войдёт в 1 ряд по горизонтали / height
            let max_count_horizontal_height;
            for (let i = 0; i < count; i++) {
                if(height * (i + 1) <= m2) {
                } else {
                    max_count_horizontal_height = i
                    break;
                }
            }
        
            // сколько больше войдёт в 1 ряд по вертикали / height
            let max_count_vertical_height;
            for (let i = 0; i < count; i++) {
                if(width * (i + 1) <= m2) {
                } else {
                    max_count_vertical_height = i
                    break;
                }
            }
            let countHeight = {
                'width': max_count_vertical_height, 
                'height':max_count_horizontal_height, 
                'base_count':max_count_vertical_height * max_count_horizontal_height
            }
            return countHeight
        }
        
        
        //   for (let i = 0; i < count; i++) {
        //     let position_cut = cut * i
        //     $('.m2').append(
        //         `<div class="cut" style="height:0px; width: 100%; border: 1px dashed #000; position: absolute; top: ${position_cut}px"></div>`)
        // }
        // по ширине
        
        // function cuttingView(){
        
        // }
        
        for (let i = 0; i < countInM2Width().height + 1; i++) {
            for (let j = 0; j < countInM2Width().width; j++) {
                posterAdd(width, height)
                position_left = width * j
            }
            position_top = height * i
        }
        
        //По высоте
        //---------
        
        
        // Оценка оставшегося пустого места
        
        // Справа
        let empty_right = m2 - (countInM2Width().width * width)
        
        // Снизу
        let empty_bottom = m2 - (countInM2Width().height * height)
        
        
        calcState.count_width = countInM2Width()
        calcState.count_height = countInM2Height()
        
        //может влезть перевёртышей
        let count_in_m2 = countInM2Height();
        count_in_m2.all = 0;
        count_in_m2.rotate_count = 0;
        let right_count;
        let bottom_count;
        
        // может что-то влезть по стороне ?
        if (empty_right >= width || empty_right >= height) {
            // console.log('Справа есть место')
            let count_rows_right= Math.floor(empty_right / height)
            right_count = countInM2Height().width * count_rows_right
            count_in_m2 = countInM2Height()
            count_in_m2.rotate_count = right_count
            
            count_in_m2.all = countInM2Height().base_count + count_in_m2.rotate_count

            if(empty_right >= height){
                for (let i = 0; i < count_rows_right; i++) {
                    for (let j = 0; j < countInM2Height().width; j++) {
                        position_top = width * j
                        position_left = (countInM2Height().width * width) + height * i
                        posterAdd(height, width)
        
                    }
                }
            }
        
        } else if (empty_bottom >= width || empty_bottom >= height) {
            // console.log('Снизу есть место')
            let count_rows_bottom = Math.floor(empty_bottom / width)
            bottom_count = countInM2Height().height * count_rows_bottom
            count_in_m2 = countInM2Height()
            count_in_m2.rotate_count = bottom_count
            count_in_m2.all = countInM2Height().base_count + count_in_m2.rotate_count; 

            if(empty_bottom >= width){
                for (let i = 0; i < count_rows_bottom; i++) {
                    for (let j = 0; j < countInM2Height().height; j++) {
                        position_left = height * j
                        posterAdd(height, width)
                    }
                    position_top = (countInM2Height().height * height) + (width * (i + 1))
                }
            }
            if(empty_bottom >= height){
                console.log('Снизу по высоте')
            }
        }
        
        
        //Количество нарезок
        let cut_count;
        if (count == 1 || calcState.value_count < calcState.count_in_m2) {
            cut_count = 1
        } else if (count == 2 && (width > 50 || height > 50) && count_in_m2.rotate_count < 1) {
            cut_count = 2
        } else if (count == 2 && (width < 50 || height < 50) && count_in_m2.rotate_count >= 1) {
            cut_count = 2
        }
        else if (count == 3 && (width > 50 || height > 50 ) && count_in_m2.rotate_count < 1) {
            cut_count = 3
        }
        else {
            cut_count =  count_in_m2.all > 0 ? Math.ceil(count / count_in_m2.all) : Math.ceil(count / count_in_m2.base_count)
        }


        
        let plase_count = count_in_m2.all ? count_in_m2.all : count_in_m2.base_count

        calcState.cut_count = cut_count
        calcState.count_in_m2 = plase_count

        calcState.base_count = count_in_m2.base_count
        calcState.rotate_count = count_in_m2.rotate_count

        // if(show_preview) {

        //     $('.stat').append(`<ul style="color: #ccc">
        //     <li>Площадь: ${m2} мм</li>
        //     <li>Ширина: ${width} мм</li>
        //     <li>Высота: ${height} мм</li>
        //     <li>В печать шт.: ${count}</li>
            
        //     <li>Количество на площадь: ${plase_count}</li>
        //     <li>Итоговое число нарезок: ${cut_count}</li>
        //     <small><li>count: ${count}</li>
        //     <li>count base: ${count_in_m2.base_count}</li>
        //     <li>count rotate: ${count_in_m2.rotate_count}</li>
        //     <li>countall: ${count_in_m2.all}</li></small></ul>`)
            
            
            
        //     $('.val_cut').text(`Нарезок: ${cut_count}`)
            
        //     $('.val_m2').text(`Количество на м²: ${plase_count}`)
            

        // }

        return cut_count
}

        
        function calcTotal() {
            // Math.round(((Number(poster.price) + Number(this.state.material_price) + Number(this.state.printing_price) * count.profit) * count.value) - ((Number(poster.price) + Number(this.state.material_price) + Number(this.state.printing_price) * count.profit) * count.value) / 100 * count.discount)
            for (let i = 0; i < poster.calc_values.counts.length; i++) {

                if ($('[name="list_counts"]:checked').val() == poster.calc_values.counts[i].value) {
                    calcState.profit = poster.calc_values.counts[i].profit
                    calcState.discount = poster.calc_values.counts[i].discount
                } 
                // else if ($('[name="list_counts"]:checked').val() != 'custom') {
                //     $(`.total_discount_6`).html('')
                // }
            }

            let printing_material_total = (poster.price + calcState.printing_price + calcState.material_price)
            calcState.calc_total_no_discount = printing_material_total


            let tot_for_view = (calcState.calc_total_no_discount * calcState.cut_count) + ((calcState.calc_total_no_discount * calcState.cut_count) * calcState.discount / 100) * calcState.profit
            $('.val_total').text(`Total: ${Math.ceil(tot_for_view)}`)
            
            
            $('#form200424072 [name="total_cart"]').val(Math.ceil(tot_for_view))
            $('#form200424072 span.t-calc').text(Math.ceil(tot_for_view))
            
            // t706__cartwin-totalamount
            // 490&nbsp;р.
            // t706__product-amount t-descr t-descr_sm
            $('#form200449246 > div.t-form__inputsbox > div.t706__cartwin-totalamount-wrap.t-descr.t-descr_xl > span.t706__cartwin-totalamount').text(`${Math.ceil(tot_for_view)}&nbsp;р.`)
            $('#rec200449246 > div > div.t706__cartwin.t706__cartwin_showed > div.t706__cartwin-content > div.t706__cartwin-products > div > div.t706__product-amount.t-descr.t-descr_sm').text(`${Math.ceil(tot_for_view)}&nbsp;р.`)
        
            $('#form200449246 [name="total_price_for_crm"]').val(Math.ceil(tot_for_view))
            $('#form200449246 [name="calc_details"]').val(
                `Тип печати: ${calcState.value_printing}
                Материал: ${calcState.value_material}
                Ширина: ${calcState.custom_width}
                Высота: ${calcState.custom_height}
                Скидка: ${calcState.discount}
                Количество: ${calcState.value_count}`
                )
        }
        


        function setCountDiscount() {
            for (let i = 0; i < poster.calc_values.counts.length; i++) {
                
                let cut_c = drawAndCalcCut(poster.calc_values.counts[i].value, false)
                let cut_c_custom = drawAndCalcCut($('[name="custom_count"]').val(), false)
                let dis_value = (calcState.calc_total_no_discount * cut_c) + ((calcState.calc_total_no_discount * cut_c) * poster.calc_values.counts[i].discount / 100) * poster.calc_values.counts[i].profit
                let dis_value_custom = (calcState.calc_total_no_discount * cut_c_custom) + ((calcState.calc_total_no_discount * cut_c_custom) * poster.calc_values.counts[i].discount / 100) * poster.calc_values.counts[i].profit

                if ($('[name="list_counts"]:checked').val() == poster.calc_values.counts[i].value) {
                    calcState.profit = poster.calc_values.counts[i].profit
                    calcState.discount = poster.calc_values.counts[i].discount
                }

                
                // if(calcState.cut_count == 1) {
                //     dis_value = (calcState.calc_total_no_discount * cut_c) * poster.calc_values.counts[0].profit
                //     dis_value_custom = (calcState.calc_total_no_discount * cut_c) * poster.calc_values.counts[0].profit
                // }

                if (poster.calc_values.counts[i].value != 'custom') {
                    $(`.discount_${i}`).html(`-${poster.calc_values.counts[i].discount}%`)
                    $(`.total_discount_${i}`).html(`${Math.ceil(dis_value)} руб`)
                    

               } else {
                    $(`.discount_${i}`).html(` > ${poster.calc_values.counts[poster.calc_values.counts.length - 2].value} | -${poster.calc_values.counts[i].discount}%`)
                    $(`.total_discount_${i}`).html(`${Math.ceil(dis_value_custom)} руб`)
               
               }
            }
        }


        function showNoticeMessage() {
            
            if(Number($('[name="custom_w"]').val()) > 1300 || Number($('[name="custom_h"]').val()) > 3000) {
                $('.notice').html(`
                    Недопустимый размер. 
                    Возможно мы сможем вам помочь. 
                    Для уточнения деталей свяжитесь с нашим менеджером`)
            } else if ($('[name="custom_w"]').val() != '' || $('[name="custom_h"]').val() != ''){
                $('.notice').html(``)
            } else if (Number($('[name="custom_w"]').val()) < 1300 || Number($('[name="custom_h"]').val()) < 3000) {
                $('.notice').html(``)
            }
        }
        
        
        function showNoticeMessageCount() {
            
            if(Number($('[name="custom_count"]').val()) > 5000) {
                $('.notice_count').html(`
                    Это количество потребует 
                    больше отведенного времени. 
                    Свяжитесь с нашим менеджером 
                    для уточнения деталей.`)
            } else if ($('[name="custom_count"]').val() != ''){
                $('.notice_count').html(``)
            } else if (Number($('[name="custom_count"]').val()) < 5000) {
                $('.notice_count').html(``)
            }
        }

        $(document).on('click', '[name=list_counts], [name=list_printing], [name=list_material], [name=list_size_items]', function(calcDiscountTotal) {
                let target = calcDiscountTotal.target; 


                if(target.name === 'list_size_items' && target.value != 'custom') {
                    //  по клику установка значений stateCalc и показ кастомных полей для размера
                    setCustomSize()
                    hideCustomSize()
                    drawAndCalcCut(calcState.value_count, true)

                } else if (target.name === 'list_size_items' && target.value === 'custom') {
                    // calcState.discount = 50
                    showCustomSize()
                }


                if(target.name === 'list_counts' && target.value != 'custom') {
                    //  по клику установка значений stateCalc и показ кастомных полей для количества

                    setCustomCount()
                    hideCustomCount()
                    drawAndCalcCut(calcState.value_count, true)

                } else if (target.name === 'list_counts' && target.value === 'custom') {
                    // calcState.discount = 50
                    showCustomCount()

                }

                setTimeout(function() {
                    calcTotal()
                    $(`.total_discount_4`).html(``)
                    showNoticeMessage()
                    showNoticeMessageCount()
                }, 500);
                
                setTimeout(function() {
                    setCountDiscount()
                    $(`.total_discount_4`).html(``)
                }, 1000);

                // setTimeout(calcTotal, 1000);                   
                // setTimeout(setCountDiscount, 2000);
                
                if (target.value != 'custom') {
                    
                    if(target.name === 'list_printing') {
                         //  по клику установка значений stateCalc для типа печати
                        updateStatePrinting(target.value)
                    }

                    if(target.name === 'list_material') {
                        //  по клику установка значений stateCalc для материала
                        updateStateMaterial(target.value)
                    }
                }
                
            
        });


        // function minimalCustomCount() {
        //     let custom_min = poster.calc_values.counts[poster.calc_values.counts.length - 2].value
        //     if ($('[name="custom_count"]').val() < custom_min) {
        //         $('[name="custom_count"]').val(custom_min)
        //     }
        //     return custom_min
        // }


        // указание кастомных сначений в размере
         $(document).on("keyup", 'input[name="custom_w"], input[name="custom_h"]', function() {
            let cw = $('[name="custom_w"]').val()
            let ch = $('[name="custom_h"]').val()
            showNoticeMessage()

            updateStateCustomSize(cw, ch)
            drawAndCalcCut(calcState.value_count, true)
            setTimeout(calcTotal, 500);
            setCountDiscount()
        });

        let custom_min;
        let cc;
         // указание кастомных сначений в количестве
        $(document).on("keyup", 'input[name="custom_count"]', function() {
            custom_min = poster.calc_values.counts[poster.calc_values.counts.length - 2].value
            cc = $('[name="custom_count"]').val()
            // let cc = minimalCustomCount()
            showNoticeMessageCount()
            if($('[name="custom_count"]').val() >= custom_min + 1) {
                updateStateCustomCount(cc)
                drawAndCalcCut(calcState.value_count, true)
                setTimeout(calcTotal, 500);
                setCountDiscount()

                
            }
            if ($('[name="custom_count"]').val() >= custom_min + 1 && $('[name="custom_count"]').val() < 5000 ){
                $('[name="custom_count"]').css({ "color": '#000'});
            } else if($('[name="custom_count"]').val() <= custom_min + 1 && $('[name="custom_count"]').val() > 5000 ) {
                $('[name="custom_count"]').css({ "color": '#ff0000'});
            }

        });
        
        // $('input[name="custom_count"]').bind('change', function() {
        //     custom_min = poster.calc_values.counts[poster.calc_values.counts.length - 2].value
        //     cc = $('[name="custom_count"]').val() < 20 ? $('[name="custom_count"]').val(custom_min):
        //    updateStateCustomCount(cc)
        //    drawAndCalcCut(calcState.value_count, true)
        //    calcTotal()
            
        // });
        
        // $(document).on('click', '[name=list_size_items]', function(checkListSize) { 
        //     //  по клику установка значений stateCalc и показ кастомных полей для размера
        //     let target = checkListSize.target; 
        //     if (target.value != 'custom') {
        //         setCustomSize()
        //         hideCustomSize()
        //         drawAndCalcCut(calcState.value_count, true)
                
        //     } else {
        //         showCustomSize()
        //     }
        // });
        
        
        
        
        // $(document).on('click', '[name=list_counts]', function(checkListCounts) { 
        //     //  по клику установка значений stateCalc и показ кастомных полей для количества
        //     let target = checkListCounts.target; 
        //     if (target.value != 'custom') {
        //         setCustomCount()
        //         hideCustomCount()
        //         drawAndCalcCut(calcState.value_count, true)
                
        //     } else {
        //         showCustomCount()
        //     }
        // });
        

        
    
    
        // $(document).on('click', '[name=list_printing]', function(checkListPrinting) { 
        //     //  по клику установка значений stateCalc для типа печати
        //     let target = checkListPrinting.target; 
        //     updateStatePrinting(target.value)

        // });
        
        
        // $(document).on('click', '[name=list_material]', function(checkListMaterial) { 
        //     //  по клику установка значений stateCalc для материала
        //     let target = checkListMaterial.target; 
        //     updateStateMaterial(target.value)
            
        // });
        


        // показать состояние (dev)
        $(document).on('click', '[href="#show_state"]', function(showState) { 
            console.log(calcState)
        });
        
    
    });
 
 
 
 
</script>