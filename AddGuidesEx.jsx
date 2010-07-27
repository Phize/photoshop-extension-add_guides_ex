/*==============================================================================
  File Name: AddGuidesEx.jsx
  Title: Add Guides EX
  Version: 1.0.0
  Author: Phize
  Author URI: http://phize.net
              http://dxd8.com

                                                        Copyright(C) 2009 Phize
==============================================================================*/



#target photoshop

app.bringToFront();



// Add Guides EX
function addGuidesEx() {

    // ----------------------------------------
    // Locale
    //   'en': English
    //   'ja': 日本語
    // ----------------------------------------
    // $.locale = 'en';

    // ----------------------------------------
    // Default values
    // ----------------------------------------
    var position = 0;	// Default position
    var width = 32;		// Default width
    var gap = 0;		// Default gap
    var number = 1;		// Default number

    // ----------------------------------------
    // Texts for localize
    // ----------------------------------------
    var i18n = {
        title: { en: 'Add Guides EX', ja: 'Add Guides EX' },
        direction: { en: 'Direction', ja: '方向' },
        horizontal: { en: 'Horizontal', ja: '水平方向' },
        vertical: { en: 'Vertical', ja: '垂直方向' },
        position: { en: 'Position', ja: '位置' },
        width: { en: 'Width', ja: '幅' },
        gap: { en: 'Gap', ja: '間隔' },
        number: { en: 'Number', ja: '数' },
        unit: { en: 'Unit', ja: '単位' },
        ok: { en: 'OK', ja: 'OK' },
        cancel: { en: 'Cancel', ja: 'キャンセル' }
    };

    // ----------------------------------------
    // Dialog resource object
    // ----------------------------------------
    var ui =
        "dialog { \
             text: '" + localize(i18n.title) + "', \
             orientation: 'row', \
             gVariable: Group { \
                 orientation: 'column', \
                 alignment: 'fill', \
                 pDirection: Panel { \
                     alignChildren: 'left', \
                     text: '" + localize(i18n.direction) + "', \
                     horizontal: RadioButton { text: '" + localize(i18n.horizontal) + "' }, \
                     vertical: RadioButton { text: '" + localize(i18n.vertical) + "', value: true }, \
                 }, \
                 gPosition: Group { \
                     orientation: 'row', \
                     alignment: 'right', \
                     label: StaticText { text: '" + localize(i18n.position) + ":' }, \
                     position: EditText { text: '" + position + "', preferredSize: [ 48, 20 ] }\
                 }, \
                 gWidth: Group { \
                     orientation: 'row', \
                     alignment: 'right', \
                     label: StaticText { text: '" + localize(i18n.width) + ":' }, \
                     width: EditText { text: '" + width + "', preferredSize: [ 48, 20 ] }\
                 }, \
                 gGap: Group { \
                     orientation: 'row', \
                     alignment: 'right', \
                     label: StaticText { text: '" + localize(i18n.gap) + ":' }, \
                     gap: EditText { text: '" + gap + "', preferredSize: [ 48, 20 ] }\
                 }, \
                 gNumber: Group { \
                     orientation: 'row', \
                     alignment: 'right', \
                     label: StaticText { text: '" + localize(i18n.number) + ":' }, \
                     number: EditText { text: '" + number + "', preferredSize: [ 48, 20 ] }\
                 }, \
             }, \
             gButton: Group { \
                 orientation: 'column', \
                 alignment: 'fill', \
                 ok: Button { \
                     text: '" + localize(i18n.ok) + "', \
                     properties: { name: 'ok' }, \
                 }, \
                 cancelBtn: Button { \
                     text: '" + localize(i18n.cancel) + "', \
                     properties: { name: 'cancel' }, \
                 }, \
             } \
         }";



    // ----------------------------------------
    // Methods
    // ----------------------------------------
    function addGuide(offset, orientation) {
        var id1 = charIDToTypeID('Mk  ');
        var desc1 = new ActionDescriptor();
        var id2 = charIDToTypeID('Nw  ');
        var desc2 = new ActionDescriptor();
        var id3 = charIDToTypeID('Pstn');
        var id4 = charIDToTypeID('#Rlt');
        desc2.putUnitDouble(id3, id4, offset);
        var id5 = charIDToTypeID('Ornt');
        var id6 = charIDToTypeID('Ornt');
        var id7 = charIDToTypeID(orientation);
        desc2.putEnumerated(id5, id6, id7);
        var id8 = charIDToTypeID('Gd  ');
        desc1.putObject(id2, id8, desc2);
        executeAction(id1, desc1, DialogModes.NO);
    }

    function ok() {
        var direction = dlg.gVariable.pDirection.vertical.value ? 'Vrtc' : 'Hrzn';
        var position = parseInt(dlg.gVariable.gPosition.position.text);
        var width = parseInt(dlg.gVariable.gWidth.width.text);
        var gap = parseInt(dlg.gVariable.gGap.gap.text);
        var number = parseInt(dlg.gVariable.gNumber.number.text);

        for (var i = 0; i < number; i ++) {
            if (gap > 0 && i > 0) {
                addGuide(position + width * i + gap * (i - 1), direction);
                addGuide(position + width * i + gap * i, direction);
            } else {
                addGuide(position + width * i, direction);
            }
        }

        dlg.close();
    }

    function cancel() {
        dlg.close();
    }



    // ----------------------------------------
    // Main
    // ----------------------------------------
    var dlg = new Window(ui);

    dlg.gButton.ok.onClick = ok;
    dlg.gButton.cancelBtn.onClick = cancel;

    dlg.center();
    dlg.show();
}





if (app.documents.length > 0) {
    // Store default setting
    var _rulerUnits = app.preferences.Units;
    var _typeUnits = app.preferences.typeUnits;
    var _displayDialogs = app.displayDialogs;

    // Set setting for script
    app.preferences.rulerUnits = Units.PIXELS;
    app.preferences.typeUnits = TypeUnits.PIXELS;
    app.displayDialogs = DialogModes.NO;

    // Show dialog
    addGuidesEx();

    // Restore default setting
    app.preferences.Units = _rulerUnits;
    app.preferences.typeUnits = _typeUnits;
    app.displayDialogs = _displayDialogs;
}
