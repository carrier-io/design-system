function lgFormatter(value, row, index) {
    if (value === "perfmeter") {
        return '<img src="assets/ico/jmeter.png" width="20">'
    } else if (value === "perfgun") {
        return '<img src="assets/ico/gatling.png" width="20">'
    } else {
        return value
    }
}

function inputFormatter(value, row, index, field) {
    return `<div class="custom-input">
        <input
            type="text"
            placeholder="Text"
            onchange="updateCell(this, '${index}', '${field}')" value="${value}">
    </div>`
}

function updateCell(el, row, field) {
    console.log(el, row, field)
    $(el.closest('table')).bootstrapTable('updateCell', {index: row, field: field, value: el.value})
}

const SEVERITY_TYPES = [
    {
        className: "colored-select-red",
        title: "CRITICAL"
    },
    {
        className: "colored-select-orange",
        title: "HIGH"
    },
    {
        className: "colored-select-yellow",
        title: "MEDIUM"
    },
    {
        className: "colored-select-green",
        title: "LOW"
    },
    {
        className: "colored-select-blue",
        title: "INFO"
    },
    {
        className: "colored-select-default",
        title: "UNEXPECTED"
    },
    {
        className: "colored-select-darkblue",
        title: "IGNORE"
    }
]

function formatterSeverity(value, row, index, field) {
    const options = SEVERITY_TYPES.map(item =>
        `<option
            class=${item.className}
            value=${item.title}
            ${item.title.toLowerCase() === value.toLowerCase() ? 'selected' : ''}
        >
            ${item.title}
        </option>
        `
    )
    return `
        <select class="selectpicker btn-colored-select mr-2 btn-colored-table" data-style="btn-colored">
            ${options.join('')}
        </select>
    `
}

function dataTypeFormatter(value, row, index, field) {
    const options = ["name", "default", "type", "description", "action"].map(item =>
        `<option
            value=${item}
            ${item.toLowerCase() === value.toLowerCase() ? 'selected' : ''}
        >
            ${item}
        </option>
        `
    )
    return `
        <select class="selectpicker bootstrap-select__b" data-style="btn">
            ${options.join('')}
        </select>
    `
}

const addEmptyParamsRow = source => {
    $(source).closest('.section').find('.params-table').bootstrapTable(
        'append',
        {"name": "", "default": "", "type": "string", "description": "", "action": ""}
    )
}


function parametersDeleteFormatter(value, row, index) {
    return `
    <div class="d-flex justify-content-end">
        <button type="button" class="btn btn-16 btn-action" onclick="deleteParams(${index}, this)"><i class="fas fa-trash-alt"></i></button>
    </div>
    `
}

function actionFormatter(value, row, index) {
    return `
    <div class="d-flex justify-content-end table-action">
        <button type="button" class="btn btn-24 btn-action"><i class="fas fa-play"></i></button>
        <button type="button" class="btn btn-24 btn-action"><i class="fas fa-cog"></i></button>
        <button type="button" class="btn btn-24 btn-action"><i class="fas fa-share-alt"></i></button>
        <button type="button" class="btn btn-24 btn-action"><i class="fas fa-trash-alt"></i></button>
    </div>
    `
}

$('.params-table').on('all.bs.table', () => $('.selectpicker').selectpicker('render'))

function nameStyle(value, row, index) {
    return {css: {"max-width": "100px", "overflow": "hidden", "text-overflow": "ellipsis", "white-space": "nowrap"}}
}

const deleteParams = (index, source) => {
    $(source).closest('.params-table').bootstrapTable('remove', {
        field: '$index',
        values: [index]
    })
}
(function ($) {
    'use strict';
    $.fn.bootstrapTable.locales['en-US-custom'] = {
        formatRecordsPerPage: function (pageNumber) {
            return `<span style="position: relative; top: 3px">Show: </span>${pageNumber}`;
        },
        formatShowingRows: function (pageFrom, pageTo, totalRows) {
            return `${totalRows} items`;
        },
        formatDetailPagination: function (totalRows) {
            return `${totalRows} items`;
        },
    };
    $.extend($.fn.bootstrapTable.defaults, $.fn.bootstrapTable.locales['en-US-custom']);
})(jQuery);
// script fot tables with vue.js when injected event (vue_init)
$(document).on('vue_init', () => {
    $('.table').on('all.bs.table', () => {
        $('.selectpicker').selectpicker('render');
        initColoredSelect();
    })
})
// script fot tables without vue.js
$('.table').on('all.bs.table', () => {
    $('.selectpicker').selectpicker('render');
})