module.exports = { generate }

const htmlGenerator = {
    button: function (data) {
        let html = "";
        html += `              <div class="wrapper">\n`
        html += `                  <div class="button">\n`
        html += `                       <button>${data["text"]}</button>\n`
        html += `                  </div>\n`
        html += `               </div>\n`
        return html;
    },
    input: function (data) {
        let html = "";
        html += `              <div class="wrapper">\n`;
        html += `                  <label>${data["label"]}</label>\n`;
        html += `                  <input type=${data["type"]} placeholder="${data["placeholder"]}" id="${data["id"]}" required>\n`;
        html += `              </div>\n`;
        return html;
    },
    radio: function (data) {
        let html = "";

        html += '                  <div class="block-radio">\n';
        html += `                      <input name="${data["name"]}" type="${data["type"]}" value="${data["value"]}" required><p>${data["text"]}</p>\n`;
        html += '                  </div>\n';
        return html;

    },

    radios: function (data) {
      let radio_html = "";
      for (let radio of data) {
          radio_html += this.radio(radio);
      }

      let html = "";
      html += `              <div class="wrapper">\n`;
      html += `                 <div class="wrapper_radio">\n`
      html += `${radio_html}`
      html += '                 </div>\n'
      html += '              </div>\n'
      return html;
    },
    hr: function () {
        return `              </hr>\n`;
    },
    title: function (data) {
        return `              <h1>${data.replace("\n", "</br>")}</h1>\n`;
    },
    subtitle: function (data) {

        return '              <div class="wrapper">\n' +
            '                 <div class="title">\n' +
            `                       <h2>${data}</h2>\n` +
            '                 </div>\n' +
            '              </div>\n';
    }
}

function generate(json) {
    let startHtml = '<header class="header">\n' +
        '   <div class="container">\n' +
        '      <div class="form">\n' +
        '         <form action="www.example.com">\n' +
        '            <div class="info-block">\n';

    let mediumHtml = "";
    for (let value of Object.keys(json["layout"])) {
        let key = value;
        switch (key.replace("_", "")) {
            case "inputs":
                for (let data_input of json["layout"][key])
                    mediumHtml += htmlGenerator.input(data_input);
                break;
            case "radios":
                mediumHtml += htmlGenerator.radios(json["layout"][key]);
                break;
            case "title":
                mediumHtml += htmlGenerator.title(json["layout"][key]);
                break;
            case "subtitle":
                mediumHtml += htmlGenerator.subtitle(json["layout"][key]);
                break;
            case "hr":
                mediumHtml += htmlGenerator.hr();
                break;
            case "submit":
                mediumHtml += htmlGenerator.button(json["layout"][key]);
                break;
        }
    }

    let html_addonAnimated = "";
    if (json["settings"]["addonAnimated"]) {
        let addonAnimated = require('fs').readFileSync('files/Group2.svg').toString();
        html_addonAnimated += '  <object\n' +
            '                    type="image/svg+xml"\n' +
            '                    data="base64"\n' +
            '                    height="1069px"\n' +
            '                    width="474px">\n' +
            `${addonAnimated}\n` +
            '</object>\n'
    }

    let endHtml = '            </div>\n' +
        '         </form>\n' +
        `      ${html_addonAnimated}\n` +
                '      </div>\n' +
        '    </div>\n' +
        '</header>'


    let css = require('fs').readFileSync('files/main.css').toString();
    let scriptJS = require('fs').readFileSync('files/main.js').toString();
    let resultHtml = '<!DOCTYPE html>\n' +
        '<html lang="en">\n' +
        '<head>\n' +
        '    <meta charset="UTF-8">\n' +
        '    <title>Rocket Form</title>\n' +
        '</head>\n' +
        '<body>\n' +
        `${startHtml + mediumHtml + endHtml}\n` +
        `<style>\n` +
        `${css}\n` +
        `</style>\n` +
        `<script type="text/javascript">\n` +
        `${scriptJS}\n` +
        `</script>\n` +

        '</body>';

    return resultHtml;
}
