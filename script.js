(function(){
    var script = {
 "scrollBarMargin": 2,
 "id": "rootPlayer",
 "children": [
  "this.MainViewer",
  "this.IconButton_493E7194_5F5A_32C7_41D0_1B02FAF70A98",
  "this.Image_278E0513_9E68_4151_418F_E5411D76D16C",
  "this.Image_B22B414C_A045_4B57_41DB_29D035DF914A"
 ],
 "class": "Player",
 "start": "this.init()",
 "horizontalAlign": "left",
 "width": "100%",
 "contentOpaque": false,
 "borderSize": 0,
 "scrollBarWidth": 10,
 "defaultVRPointer": "laser",
 "scripts": {
  "getMediaHeight": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxH=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('height') > maxH) maxH = r.get('height'); } return maxH; }else{ return r.get('height') } default: return media.get('height'); } },
  "setPanoramaCameraWithCurrentSpot": function(playListItem){  var currentPlayer = this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer == undefined){ return; } var playerClass = currentPlayer.get('class'); if(playerClass != 'PanoramaPlayer' && playerClass != 'Video360Player'){ return; } var fromMedia = currentPlayer.get('panorama'); if(fromMedia == undefined) { fromMedia = currentPlayer.get('video'); } var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, fromMedia); this.startPanoramaWithCamera(panorama, newCamera); },
  "getComponentByName": function(name){  var list = this.getByClassName('UIComponent'); for(var i = 0, count = list.length; i<count; ++i){ var component = list[i]; var data = component.get('data'); if(data != undefined && data.name == name){ return component; } } return undefined; },
  "getMediaFromPlayer": function(player){  switch(player.get('class')){ case 'PanoramaPlayer': return player.get('panorama') || player.get('video'); case 'VideoPlayer': case 'Video360Player': return player.get('video'); case 'PhotoAlbumPlayer': return player.get('photoAlbum'); case 'MapPlayer': return player.get('map'); } },
  "openLink": function(url, name){  if(url == location.href) { return; } var isElectron = (window && window.process && window.process.versions && window.process.versions['electron']) || (navigator && navigator.userAgent && navigator.userAgent.indexOf('Electron') >= 0); if (name == '_blank' && isElectron) { if (url.startsWith('/')) { var r = window.location.href.split('/'); r.pop(); url = r.join('/') + url; } var extension = url.split('.').pop().toLowerCase(); if(extension != 'pdf' || url.startsWith('file://')) { var shell = window.require('electron').shell; shell.openExternal(url); } else { window.open(url, name); } } else if(isElectron && (name == '_top' || name == '_self')) { window.location = url; } else { var newWindow = window.open(url, name); newWindow.focus(); } },
  "getPlayListItems": function(media, player){  var itemClass = (function() { switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': return 'PanoramaPlayListItem'; case 'Video360': return 'Video360PlayListItem'; case 'PhotoAlbum': return 'PhotoAlbumPlayListItem'; case 'Map': return 'MapPlayListItem'; case 'Video': return 'VideoPlayListItem'; } })(); if (itemClass != undefined) { var items = this.getByClassName(itemClass); for (var i = items.length-1; i>=0; --i) { var item = items[i]; if(item.get('media') != media || (player != undefined && item.get('player') != player)) { items.splice(i, 1); } } return items; } else { return []; } },
  "showPopupMedia": function(w, media, playList, popupMaxWidth, popupMaxHeight, autoCloseWhenFinished, stopAudios){  var self = this; var closeFunction = function(){ playList.set('selectedIndex', -1); self.MainViewer.set('toolTipEnabled', true); if(stopAudios) { self.resumeGlobalAudios(); } this.resumePlayers(playersPaused, !stopAudios); if(isVideo) { this.unbind('resize', resizeFunction, this); } w.unbind('close', closeFunction, this); }; var endFunction = function(){ w.hide(); }; var resizeFunction = function(){ var getWinValue = function(property){ return w.get(property) || 0; }; var parentWidth = self.get('actualWidth'); var parentHeight = self.get('actualHeight'); var mediaWidth = self.getMediaWidth(media); var mediaHeight = self.getMediaHeight(media); var popupMaxWidthNumber = parseFloat(popupMaxWidth) / 100; var popupMaxHeightNumber = parseFloat(popupMaxHeight) / 100; var windowWidth = popupMaxWidthNumber * parentWidth; var windowHeight = popupMaxHeightNumber * parentHeight; var footerHeight = getWinValue('footerHeight'); var headerHeight = getWinValue('headerHeight'); if(!headerHeight) { var closeButtonHeight = getWinValue('closeButtonIconHeight') + getWinValue('closeButtonPaddingTop') + getWinValue('closeButtonPaddingBottom'); var titleHeight = self.getPixels(getWinValue('titleFontSize')) + getWinValue('titlePaddingTop') + getWinValue('titlePaddingBottom'); headerHeight = closeButtonHeight > titleHeight ? closeButtonHeight : titleHeight; headerHeight += getWinValue('headerPaddingTop') + getWinValue('headerPaddingBottom'); } var contentWindowWidth = windowWidth - getWinValue('bodyPaddingLeft') - getWinValue('bodyPaddingRight') - getWinValue('paddingLeft') - getWinValue('paddingRight'); var contentWindowHeight = windowHeight - headerHeight - footerHeight - getWinValue('bodyPaddingTop') - getWinValue('bodyPaddingBottom') - getWinValue('paddingTop') - getWinValue('paddingBottom'); var parentAspectRatio = contentWindowWidth / contentWindowHeight; var mediaAspectRatio = mediaWidth / mediaHeight; if(parentAspectRatio > mediaAspectRatio) { windowWidth = contentWindowHeight * mediaAspectRatio + getWinValue('bodyPaddingLeft') + getWinValue('bodyPaddingRight') + getWinValue('paddingLeft') + getWinValue('paddingRight'); } else { windowHeight = contentWindowWidth / mediaAspectRatio + headerHeight + footerHeight + getWinValue('bodyPaddingTop') + getWinValue('bodyPaddingBottom') + getWinValue('paddingTop') + getWinValue('paddingBottom'); } if(windowWidth > parentWidth * popupMaxWidthNumber) { windowWidth = parentWidth * popupMaxWidthNumber; } if(windowHeight > parentHeight * popupMaxHeightNumber) { windowHeight = parentHeight * popupMaxHeightNumber; } w.set('width', windowWidth); w.set('height', windowHeight); w.set('x', (parentWidth - getWinValue('actualWidth')) * 0.5); w.set('y', (parentHeight - getWinValue('actualHeight')) * 0.5); }; if(autoCloseWhenFinished){ this.executeFunctionWhenChange(playList, 0, endFunction); } var mediaClass = media.get('class'); var isVideo = mediaClass == 'Video' || mediaClass == 'Video360'; playList.set('selectedIndex', 0); if(isVideo){ this.bind('resize', resizeFunction, this); resizeFunction(); playList.get('items')[0].get('player').play(); } else { w.set('width', popupMaxWidth); w.set('height', popupMaxHeight); } this.MainViewer.set('toolTipEnabled', false); if(stopAudios) { this.pauseGlobalAudios(); } var playersPaused = this.pauseCurrentPlayers(!stopAudios); w.bind('close', closeFunction, this); w.show(this, true); },
  "setEndToItemIndex": function(playList, fromIndex, toIndex){  var endFunction = function(){ if(playList.get('selectedIndex') == fromIndex) playList.set('selectedIndex', toIndex); }; this.executeFunctionWhenChange(playList, fromIndex, endFunction); },
  "pauseGlobalAudiosWhilePlayItem": function(playList, index, exclude){  var self = this; var item = playList.get('items')[index]; var media = item.get('media'); var player = item.get('player'); var caller = media.get('id'); var endFunc = function(){ if(playList.get('selectedIndex') != index) { if(hasState){ player.unbind('stateChange', stateChangeFunc, self); } self.resumeGlobalAudios(caller); } }; var stateChangeFunc = function(event){ var state = event.data.state; if(state == 'stopped'){ this.resumeGlobalAudios(caller); } else if(state == 'playing'){ this.pauseGlobalAudios(caller, exclude); } }; var mediaClass = media.get('class'); var hasState = mediaClass == 'Video360' || mediaClass == 'Video'; if(hasState){ player.bind('stateChange', stateChangeFunc, this); } this.pauseGlobalAudios(caller, exclude); this.executeFunctionWhenChange(playList, index, endFunc, endFunc); },
  "existsKey": function(key){  return key in window; },
  "playAudioList": function(audios){  if(audios.length == 0) return; var currentAudioCount = -1; var currentAudio; var playGlobalAudioFunction = this.playGlobalAudio; var playNext = function(){ if(++currentAudioCount >= audios.length) currentAudioCount = 0; currentAudio = audios[currentAudioCount]; playGlobalAudioFunction(currentAudio, playNext); }; playNext(); },
  "stopGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; if(audio){ delete audios[audio.get('id')]; if(Object.keys(audios).length == 0){ window.currentGlobalAudios = undefined; } } } if(audio) audio.stop(); },
  "setMapLocation": function(panoramaPlayListItem, mapPlayer){  var resetFunction = function(){ panoramaPlayListItem.unbind('stop', resetFunction, this); player.set('mapPlayer', null); }; panoramaPlayListItem.bind('stop', resetFunction, this); var player = panoramaPlayListItem.get('player'); player.set('mapPlayer', mapPlayer); },
  "historyGoBack": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.back(); } },
  "cloneCamera": function(camera){  var newCamera = this.rootPlayer.createInstance(camera.get('class')); newCamera.set('id', camera.get('id') + '_copy'); newCamera.set('idleSequence', camera.get('initialSequence')); return newCamera; },
  "playGlobalAudioWhilePlay": function(playList, index, audio, endCallback){  var changeFunction = function(event){ if(event.data.previousSelectedIndex == index){ this.stopGlobalAudio(audio); if(isPanorama) { var media = playListItem.get('media'); var audios = media.get('audios'); audios.splice(audios.indexOf(audio), 1); media.set('audios', audios); } playList.unbind('change', changeFunction, this); if(endCallback) endCallback(); } }; var audios = window.currentGlobalAudios; if(audios && audio.get('id') in audios){ audio = audios[audio.get('id')]; if(audio.get('state') != 'playing'){ audio.play(); } return audio; } playList.bind('change', changeFunction, this); var playListItem = playList.get('items')[index]; var isPanorama = playListItem.get('class') == 'PanoramaPlayListItem'; if(isPanorama) { var media = playListItem.get('media'); var audios = (media.get('audios') || []).slice(); if(audio.get('class') == 'MediaAudio') { var panoramaAudio = this.rootPlayer.createInstance('PanoramaAudio'); panoramaAudio.set('autoplay', false); panoramaAudio.set('audio', audio.get('audio')); panoramaAudio.set('loop', audio.get('loop')); panoramaAudio.set('id', audio.get('id')); var stateChangeFunctions = audio.getBindings('stateChange'); for(var i = 0; i<stateChangeFunctions.length; ++i){ var f = stateChangeFunctions[i]; if(typeof f == 'string') f = new Function('event', f); panoramaAudio.bind('stateChange', f, this); } audio = panoramaAudio; } audios.push(audio); media.set('audios', audios); } return this.playGlobalAudio(audio, endCallback); },
  "getMediaWidth": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxW=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('width') > maxW) maxW = r.get('width'); } return maxW; }else{ return r.get('width') } default: return media.get('width'); } },
  "autotriggerAtStart": function(playList, callback, once){  var onChange = function(event){ callback(); if(once == true) playList.unbind('change', onChange, this); }; playList.bind('change', onChange, this); },
  "getCurrentPlayers": function(){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); return players; },
  "showPopupPanoramaVideoOverlay": function(popupPanoramaOverlay, closeButtonProperties, stopAudios){  var self = this; var showEndFunction = function() { popupPanoramaOverlay.unbind('showEnd', showEndFunction); closeButton.bind('click', hideFunction, this); setCloseButtonPosition(); closeButton.set('visible', true); }; var endFunction = function() { if(!popupPanoramaOverlay.get('loop')) hideFunction(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); popupPanoramaOverlay.set('visible', false); closeButton.set('visible', false); closeButton.unbind('click', hideFunction, self); popupPanoramaOverlay.unbind('end', endFunction, self); popupPanoramaOverlay.unbind('hideEnd', hideFunction, self, true); self.resumePlayers(playersPaused, true); if(stopAudios) { self.resumeGlobalAudios(); } }; var setCloseButtonPosition = function() { var right = 10; var top = 10; closeButton.set('right', right); closeButton.set('top', top); }; this.MainViewer.set('toolTipEnabled', false); var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(true); if(stopAudios) { this.pauseGlobalAudios(); } popupPanoramaOverlay.bind('end', endFunction, this, true); popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); popupPanoramaOverlay.bind('hideEnd', hideFunction, this, true); popupPanoramaOverlay.set('visible', true); },
  "resumeGlobalAudios": function(caller){  if (window.pauseGlobalAudiosState == undefined || !(caller in window.pauseGlobalAudiosState)) return; var audiosPaused = window.pauseGlobalAudiosState[caller]; delete window.pauseGlobalAudiosState[caller]; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = audiosPaused.length-1; j>=0; --j) { var a = audiosPaused[j]; if(objAudios.indexOf(a) != -1) audiosPaused.splice(j, 1); } } for (var i = 0, count = audiosPaused.length; i<count; ++i) { var a = audiosPaused[i]; if (a.get('state') == 'paused') a.play(); } },
  "setPanoramaCameraWithSpot": function(playListItem, yaw, pitch){  var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); var initialPosition = newCamera.get('initialPosition'); initialPosition.set('yaw', yaw); initialPosition.set('pitch', pitch); this.startPanoramaWithCamera(panorama, newCamera); },
  "initGA": function(){  var sendFunc = function(category, event, label) { ga('send', 'event', category, event, label); }; var media = this.getByClassName('Panorama'); media = media.concat(this.getByClassName('Video360')); media = media.concat(this.getByClassName('Map')); for(var i = 0, countI = media.length; i<countI; ++i){ var m = media[i]; var mediaLabel = m.get('label'); var overlays = this.getOverlays(m); for(var j = 0, countJ = overlays.length; j<countJ; ++j){ var overlay = overlays[j]; var overlayLabel = overlay.get('data') != undefined ? mediaLabel + ' - ' + overlay.get('data')['label'] : mediaLabel; switch(overlay.get('class')) { case 'HotspotPanoramaOverlay': case 'HotspotMapOverlay': var areas = overlay.get('areas'); for (var z = 0; z<areas.length; ++z) { areas[z].bind('click', sendFunc.bind(this, 'Hotspot', 'click', overlayLabel), this); } break; case 'CeilingCapPanoramaOverlay': case 'TripodCapPanoramaOverlay': overlay.bind('click', sendFunc.bind(this, 'Cap', 'click', overlayLabel), this); break; } } } var components = this.getByClassName('Button'); components = components.concat(this.getByClassName('IconButton')); for(var i = 0, countI = components.length; i<countI; ++i){ var c = components[i]; var componentLabel = c.get('data')['name']; c.bind('click', sendFunc.bind(this, 'Skin', 'click', componentLabel), this); } var items = this.getByClassName('PlayListItem'); var media2Item = {}; for(var i = 0, countI = items.length; i<countI; ++i) { var item = items[i]; var media = item.get('media'); if(!(media.get('id') in media2Item)) { item.bind('begin', sendFunc.bind(this, 'Media', 'play', media.get('label')), this); media2Item[media.get('id')] = item; } } },
  "getPixels": function(value){  var result = new RegExp('((\\+|\\-)?\\d+(\\.\\d*)?)(px|vw|vh|vmin|vmax)?', 'i').exec(value); if (result == undefined) { return 0; } var num = parseFloat(result[1]); var unit = result[4]; var vw = this.rootPlayer.get('actualWidth') / 100; var vh = this.rootPlayer.get('actualHeight') / 100; switch(unit) { case 'vw': return num * vw; case 'vh': return num * vh; case 'vmin': return num * Math.min(vw, vh); case 'vmax': return num * Math.max(vw, vh); default: return num; } },
  "setMainMediaByIndex": function(index){  var item = undefined; if(index >= 0 && index < this.mainPlayList.get('items').length){ this.mainPlayList.set('selectedIndex', index); item = this.mainPlayList.get('items')[index]; } return item; },
  "historyGoForward": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.forward(); } },
  "updateVideoCues": function(playList, index){  var playListItem = playList.get('items')[index]; var video = playListItem.get('media'); if(video.get('cues').length == 0) return; var player = playListItem.get('player'); var cues = []; var changeFunction = function(){ if(playList.get('selectedIndex') != index){ video.unbind('cueChange', cueChangeFunction, this); playList.unbind('change', changeFunction, this); } }; var cueChangeFunction = function(event){ var activeCues = event.data.activeCues; for(var i = 0, count = cues.length; i<count; ++i){ var cue = cues[i]; if(activeCues.indexOf(cue) == -1 && (cue.get('startTime') > player.get('currentTime') || cue.get('endTime') < player.get('currentTime')+0.5)){ cue.trigger('end'); } } cues = activeCues; }; video.bind('cueChange', cueChangeFunction, this); playList.bind('change', changeFunction, this); },
  "init": function(){  if(!Object.hasOwnProperty('values')) { Object.values = function(o){ return Object.keys(o).map(function(e) { return o[e]; }); }; } var history = this.get('data')['history']; var playListChangeFunc = function(e){ var playList = e.source; var index = playList.get('selectedIndex'); if(index < 0) return; var id = playList.get('id'); if(!history.hasOwnProperty(id)) history[id] = new HistoryData(playList); history[id].add(index); }; var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i) { var playList = playLists[i]; playList.bind('change', playListChangeFunc, this); } },
  "loopAlbum": function(playList, index){  var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var loopFunction = function(){ player.play(); }; this.executeFunctionWhenChange(playList, index, loopFunction); },
  "triggerOverlay": function(overlay, eventName){  if(overlay.get('areas') != undefined) { var areas = overlay.get('areas'); for(var i = 0; i<areas.length; ++i) { areas[i].trigger(eventName); } } else { overlay.trigger(eventName); } },
  "showPopupPanoramaOverlay": function(popupPanoramaOverlay, closeButtonProperties, imageHD, toggleImage, toggleImageHD, autoCloseMilliSeconds, audio, stopBackgroundAudio){  var self = this; this.MainViewer.set('toolTipEnabled', false); var cardboardEnabled = this.isCardboardViewMode(); if(!cardboardEnabled) { var zoomImage = this.zoomImagePopupPanorama; var showDuration = popupPanoramaOverlay.get('showDuration'); var hideDuration = popupPanoramaOverlay.get('hideDuration'); var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); var popupMaxWidthBackup = popupPanoramaOverlay.get('popupMaxWidth'); var popupMaxHeightBackup = popupPanoramaOverlay.get('popupMaxHeight'); var showEndFunction = function() { var loadedFunction = function(){ if(!self.isCardboardViewMode()) popupPanoramaOverlay.set('visible', false); }; popupPanoramaOverlay.unbind('showEnd', showEndFunction, self); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', 1); self.showPopupImage(imageHD, toggleImageHD, popupPanoramaOverlay.get('popupMaxWidth'), popupPanoramaOverlay.get('popupMaxHeight'), null, null, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedFunction, hideFunction); }; var hideFunction = function() { var restoreShowDurationFunction = function(){ popupPanoramaOverlay.unbind('showEnd', restoreShowDurationFunction, self); popupPanoramaOverlay.set('visible', false); popupPanoramaOverlay.set('showDuration', showDuration); popupPanoramaOverlay.set('popupMaxWidth', popupMaxWidthBackup); popupPanoramaOverlay.set('popupMaxHeight', popupMaxHeightBackup); }; self.resumePlayers(playersPaused, audio == null || !stopBackgroundAudio); var currentWidth = zoomImage.get('imageWidth'); var currentHeight = zoomImage.get('imageHeight'); popupPanoramaOverlay.bind('showEnd', restoreShowDurationFunction, self, true); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', hideDuration); popupPanoramaOverlay.set('popupMaxWidth', currentWidth); popupPanoramaOverlay.set('popupMaxHeight', currentHeight); if(popupPanoramaOverlay.get('visible')) restoreShowDurationFunction(); else popupPanoramaOverlay.set('visible', true); self.MainViewer.set('toolTipEnabled', true); }; if(!imageHD){ imageHD = popupPanoramaOverlay.get('image'); } if(!toggleImageHD && toggleImage){ toggleImageHD = toggleImage; } popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); } else { var hideEndFunction = function() { self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } popupPanoramaOverlay.unbind('hideEnd', hideEndFunction, self); self.MainViewer.set('toolTipEnabled', true); }; var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } popupPanoramaOverlay.bind('hideEnd', hideEndFunction, this, true); } popupPanoramaOverlay.set('visible', true); },
  "getPanoramaOverlayByName": function(panorama, name){  var overlays = this.getOverlays(panorama); for(var i = 0, count = overlays.length; i<count; ++i){ var overlay = overlays[i]; var data = overlay.get('data'); if(data != undefined && data.label == name){ return overlay; } } return undefined; },
  "getCurrentPlayerWithMedia": function(media){  var playerClass = undefined; var mediaPropertyName = undefined; switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'panorama'; break; case 'Video360': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'video'; break; case 'PhotoAlbum': playerClass = 'PhotoAlbumPlayer'; mediaPropertyName = 'photoAlbum'; break; case 'Map': playerClass = 'MapPlayer'; mediaPropertyName = 'map'; break; case 'Video': playerClass = 'VideoPlayer'; mediaPropertyName = 'video'; break; }; if(playerClass != undefined) { var players = this.getByClassName(playerClass); for(var i = 0; i<players.length; ++i){ var player = players[i]; if(player.get(mediaPropertyName) == media) { return player; } } } else { return undefined; } },
  "changeBackgroundWhilePlay": function(playList, index, color){  var stopFunction = function(event){ playListItem.unbind('stop', stopFunction, this); if((color == viewerArea.get('backgroundColor')) && (colorRatios == viewerArea.get('backgroundColorRatios'))){ viewerArea.set('backgroundColor', backgroundColorBackup); viewerArea.set('backgroundColorRatios', backgroundColorRatiosBackup); } }; var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var viewerArea = player.get('viewerArea'); var backgroundColorBackup = viewerArea.get('backgroundColor'); var backgroundColorRatiosBackup = viewerArea.get('backgroundColorRatios'); var colorRatios = [0]; if((color != backgroundColorBackup) || (colorRatios != backgroundColorRatiosBackup)){ viewerArea.set('backgroundColor', color); viewerArea.set('backgroundColorRatios', colorRatios); playListItem.bind('stop', stopFunction, this); } },
  "loadFromCurrentMediaPlayList": function(playList, delta){  var currentIndex = playList.get('selectedIndex'); var totalItems = playList.get('items').length; var newIndex = (currentIndex + delta) % totalItems; while(newIndex < 0){ newIndex = totalItems + newIndex; }; if(currentIndex != newIndex){ playList.set('selectedIndex', newIndex); } },
  "unregisterKey": function(key){  delete window[key]; },
  "getOverlays": function(media){  switch(media.get('class')){ case 'Panorama': var overlays = media.get('overlays').concat() || []; var frames = media.get('frames'); for(var j = 0; j<frames.length; ++j){ overlays = overlays.concat(frames[j].get('overlays') || []); } return overlays; case 'Video360': case 'Map': return media.get('overlays') || []; default: return []; } },
  "shareWhatsapp": function(url){  window.open('https://api.whatsapp.com/send/?text=' + encodeURIComponent(url), '_blank'); },
  "updateMediaLabelFromPlayList": function(playList, htmlText, playListItemStopToDispose){  var changeFunction = function(){ var index = playList.get('selectedIndex'); if(index >= 0){ var beginFunction = function(){ playListItem.unbind('begin', beginFunction); setMediaLabel(index); }; var setMediaLabel = function(index){ var media = playListItem.get('media'); var text = media.get('data'); if(!text) text = media.get('label'); setHtml(text); }; var setHtml = function(text){ if(text !== undefined) { htmlText.set('html', '<div style=\"text-align:left\"><SPAN STYLE=\"color:#FFFFFF;font-size:12px;font-family:Verdana\"><span color=\"white\" font-family=\"Verdana\" font-size=\"12px\">' + text + '</SPAN></div>'); } else { htmlText.set('html', ''); } }; var playListItem = playList.get('items')[index]; if(htmlText.get('html')){ setHtml('Loading...'); playListItem.bind('begin', beginFunction); } else{ setMediaLabel(index); } } }; var disposeFunction = function(){ htmlText.set('html', undefined); playList.unbind('change', changeFunction, this); playListItemStopToDispose.unbind('stop', disposeFunction, this); }; if(playListItemStopToDispose){ playListItemStopToDispose.bind('stop', disposeFunction, this); } playList.bind('change', changeFunction, this); changeFunction(); },
  "visibleComponentsIfPlayerFlagEnabled": function(components, playerFlag){  var enabled = this.get(playerFlag); for(var i in components){ components[i].set('visible', enabled); } },
  "pauseGlobalAudios": function(caller, exclude){  if (window.pauseGlobalAudiosState == undefined) window.pauseGlobalAudiosState = {}; if (window.pauseGlobalAudiosList == undefined) window.pauseGlobalAudiosList = []; if (caller in window.pauseGlobalAudiosState) { return; } var audios = this.getByClassName('Audio').concat(this.getByClassName('VideoPanoramaOverlay')); if (window.currentGlobalAudios != undefined) audios = audios.concat(Object.values(window.currentGlobalAudios)); var audiosPaused = []; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = 0; j<objAudios.length; ++j) { var a = objAudios[j]; if(audiosPaused.indexOf(a) == -1) audiosPaused.push(a); } } window.pauseGlobalAudiosState[caller] = audiosPaused; for (var i = 0, count = audios.length; i < count; ++i) { var a = audios[i]; if (a.get('state') == 'playing' && (exclude == undefined || exclude.indexOf(a) == -1)) { a.pause(); audiosPaused.push(a); } } },
  "getPlayListWithMedia": function(media, onlySelected){  var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(onlySelected && playList.get('selectedIndex') == -1) continue; if(this.getPlayListItemByMedia(playList, media) != undefined) return playList; } return undefined; },
  "shareFacebook": function(url){  window.open('https://www.facebook.com/sharer/sharer.php?u=' + url, '_blank'); },
  "setMainMediaByName": function(name){  var items = this.mainPlayList.get('items'); for(var i = 0; i<items.length; ++i){ var item = items[i]; if(item.get('media').get('label') == name) { this.mainPlayList.set('selectedIndex', i); return item; } } },
  "setMediaBehaviour": function(playList, index, mediaDispatcher){  var self = this; var stateChangeFunction = function(event){ if(event.data.state == 'stopped'){ dispose.call(this, true); } }; var onBeginFunction = function() { item.unbind('begin', onBeginFunction, self); var media = item.get('media'); if(media.get('class') != 'Panorama' || (media.get('camera') != undefined && media.get('camera').get('initialSequence') != undefined)){ player.bind('stateChange', stateChangeFunction, self); } }; var changeFunction = function(){ var index = playListDispatcher.get('selectedIndex'); if(index != -1){ indexDispatcher = index; dispose.call(this, false); } }; var disposeCallback = function(){ dispose.call(this, false); }; var dispose = function(forceDispose){ if(!playListDispatcher) return; var media = item.get('media'); if((media.get('class') == 'Video360' || media.get('class') == 'Video') && media.get('loop') == true && !forceDispose) return; playList.set('selectedIndex', -1); if(panoramaSequence && panoramaSequenceIndex != -1){ if(panoramaSequence) { if(panoramaSequenceIndex > 0 && panoramaSequence.get('movements')[panoramaSequenceIndex-1].get('class') == 'TargetPanoramaCameraMovement'){ var initialPosition = camera.get('initialPosition'); var oldYaw = initialPosition.get('yaw'); var oldPitch = initialPosition.get('pitch'); var oldHfov = initialPosition.get('hfov'); var previousMovement = panoramaSequence.get('movements')[panoramaSequenceIndex-1]; initialPosition.set('yaw', previousMovement.get('targetYaw')); initialPosition.set('pitch', previousMovement.get('targetPitch')); initialPosition.set('hfov', previousMovement.get('targetHfov')); var restoreInitialPositionFunction = function(event){ initialPosition.set('yaw', oldYaw); initialPosition.set('pitch', oldPitch); initialPosition.set('hfov', oldHfov); itemDispatcher.unbind('end', restoreInitialPositionFunction, this); }; itemDispatcher.bind('end', restoreInitialPositionFunction, this); } panoramaSequence.set('movementIndex', panoramaSequenceIndex); } } if(player){ item.unbind('begin', onBeginFunction, this); player.unbind('stateChange', stateChangeFunction, this); for(var i = 0; i<buttons.length; ++i) { buttons[i].unbind('click', disposeCallback, this); } } if(sameViewerArea){ var currentMedia = this.getMediaFromPlayer(player); if(currentMedia == undefined || currentMedia == item.get('media')){ playListDispatcher.set('selectedIndex', indexDispatcher); } if(playList != playListDispatcher) playListDispatcher.unbind('change', changeFunction, this); } else{ viewerArea.set('visible', viewerVisibility); } playListDispatcher = undefined; }; var mediaDispatcherByParam = mediaDispatcher != undefined; if(!mediaDispatcher){ var currentIndex = playList.get('selectedIndex'); var currentPlayer = (currentIndex != -1) ? playList.get('items')[playList.get('selectedIndex')].get('player') : this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer) { mediaDispatcher = this.getMediaFromPlayer(currentPlayer); } } var playListDispatcher = mediaDispatcher ? this.getPlayListWithMedia(mediaDispatcher, true) : undefined; if(!playListDispatcher){ playList.set('selectedIndex', index); return; } var indexDispatcher = playListDispatcher.get('selectedIndex'); if(playList.get('selectedIndex') == index || indexDispatcher == -1){ return; } var item = playList.get('items')[index]; var itemDispatcher = playListDispatcher.get('items')[indexDispatcher]; var player = item.get('player'); var viewerArea = player.get('viewerArea'); var viewerVisibility = viewerArea.get('visible'); var sameViewerArea = viewerArea == itemDispatcher.get('player').get('viewerArea'); if(sameViewerArea){ if(playList != playListDispatcher){ playListDispatcher.set('selectedIndex', -1); playListDispatcher.bind('change', changeFunction, this); } } else{ viewerArea.set('visible', true); } var panoramaSequenceIndex = -1; var panoramaSequence = undefined; var camera = itemDispatcher.get('camera'); if(camera){ panoramaSequence = camera.get('initialSequence'); if(panoramaSequence) { panoramaSequenceIndex = panoramaSequence.get('movementIndex'); } } playList.set('selectedIndex', index); var buttons = []; var addButtons = function(property){ var value = player.get(property); if(value == undefined) return; if(Array.isArray(value)) buttons = buttons.concat(value); else buttons.push(value); }; addButtons('buttonStop'); for(var i = 0; i<buttons.length; ++i) { buttons[i].bind('click', disposeCallback, this); } if(player != itemDispatcher.get('player') || !mediaDispatcherByParam){ item.bind('begin', onBeginFunction, self); } this.executeFunctionWhenChange(playList, index, disposeCallback); },
  "isCardboardViewMode": function(){  var players = this.getByClassName('PanoramaPlayer'); return players.length > 0 && players[0].get('viewMode') == 'cardboard'; },
  "setCameraSameSpotAsMedia": function(camera, media){  var player = this.getCurrentPlayerWithMedia(media); if(player != undefined) { var position = camera.get('initialPosition'); position.set('yaw', player.get('yaw')); position.set('pitch', player.get('pitch')); position.set('hfov', player.get('hfov')); } },
  "stopAndGoCamera": function(camera, ms){  var sequence = camera.get('initialSequence'); sequence.pause(); var timeoutFunction = function(){ sequence.play(); }; setTimeout(timeoutFunction, ms); },
  "showComponentsWhileMouseOver": function(parentComponent, components, durationVisibleWhileOut){  var setVisibility = function(visible){ for(var i = 0, length = components.length; i<length; i++){ var component = components[i]; if(component.get('class') == 'HTMLText' && (component.get('html') == '' || component.get('html') == undefined)) { continue; } component.set('visible', visible); } }; if (this.rootPlayer.get('touchDevice') == true){ setVisibility(true); } else { var timeoutID = -1; var rollOverFunction = function(){ setVisibility(true); if(timeoutID >= 0) clearTimeout(timeoutID); parentComponent.unbind('rollOver', rollOverFunction, this); parentComponent.bind('rollOut', rollOutFunction, this); }; var rollOutFunction = function(){ var timeoutFunction = function(){ setVisibility(false); parentComponent.unbind('rollOver', rollOverFunction, this); }; parentComponent.unbind('rollOut', rollOutFunction, this); parentComponent.bind('rollOver', rollOverFunction, this); timeoutID = setTimeout(timeoutFunction, durationVisibleWhileOut); }; parentComponent.bind('rollOver', rollOverFunction, this); } },
  "getActivePlayerWithViewer": function(viewerArea){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); players = players.concat(this.getByClassName('MapPlayer')); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('viewerArea') == viewerArea) { var playerClass = player.get('class'); if(playerClass == 'PanoramaPlayer' && (player.get('panorama') != undefined || player.get('video') != undefined)) return player; else if((playerClass == 'VideoPlayer' || playerClass == 'Video360Player') && player.get('video') != undefined) return player; else if(playerClass == 'PhotoAlbumPlayer' && player.get('photoAlbum') != undefined) return player; else if(playerClass == 'MapPlayer' && player.get('map') != undefined) return player; } } return undefined; },
  "setStartTimeVideoSync": function(video, player){  this.setStartTimeVideo(video, player.get('currentTime')); },
  "syncPlaylists": function(playLists){  var changeToMedia = function(media, playListDispatched){ for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(playList != playListDispatched){ var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ if(items[j].get('media') == media){ if(playList.get('selectedIndex') != j){ playList.set('selectedIndex', j); } break; } } } } }; var changeFunction = function(event){ var playListDispatched = event.source; var selectedIndex = playListDispatched.get('selectedIndex'); if(selectedIndex < 0) return; var media = playListDispatched.get('items')[selectedIndex].get('media'); changeToMedia(media, playListDispatched); }; var mapPlayerChangeFunction = function(event){ var panoramaMapLocation = event.source.get('panoramaMapLocation'); if(panoramaMapLocation){ var map = panoramaMapLocation.get('map'); changeToMedia(map); } }; for(var i = 0, count = playLists.length; i<count; ++i){ playLists[i].bind('change', changeFunction, this); } var mapPlayers = this.getByClassName('MapPlayer'); for(var i = 0, count = mapPlayers.length; i<count; ++i){ mapPlayers[i].bind('panoramaMapLocation_change', mapPlayerChangeFunction, this); } },
  "getMediaByName": function(name){  var list = this.getByClassName('Media'); for(var i = 0, count = list.length; i<count; ++i){ var media = list[i]; if((media.get('class') == 'Audio' && media.get('data').label == name) || media.get('label') == name){ return media; } } return undefined; },
  "pauseCurrentPlayers": function(onlyPauseCameraIfPanorama){  var players = this.getCurrentPlayers(); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('state') == 'playing') { if(onlyPauseCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.pauseCamera(); } else { player.pause(); } } else { players.splice(i, 1); } } return players; },
  "getPlayListItemByMedia": function(playList, media){  var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media) return item; } return undefined; },
  "playGlobalAudio": function(audio, endCallback){  var endFunction = function(){ audio.unbind('end', endFunction, this); this.stopGlobalAudio(audio); if(endCallback) endCallback(); }; audio = this.getGlobalAudio(audio); var audios = window.currentGlobalAudios; if(!audios){ audios = window.currentGlobalAudios = {}; } audios[audio.get('id')] = audio; if(audio.get('state') == 'playing'){ return audio; } if(!audio.get('loop')){ audio.bind('end', endFunction, this); } audio.play(); return audio; },
  "setStartTimeVideo": function(video, time){  var items = this.getPlayListItems(video); var startTimeBackup = []; var restoreStartTimeFunc = function() { for(var i = 0; i<items.length; ++i){ var item = items[i]; item.set('startTime', startTimeBackup[i]); item.unbind('stop', restoreStartTimeFunc, this); } }; for(var i = 0; i<items.length; ++i) { var item = items[i]; var player = item.get('player'); if(player.get('video') == video && player.get('state') == 'playing') { player.seek(time); } else { startTimeBackup.push(item.get('startTime')); item.set('startTime', time); item.bind('stop', restoreStartTimeFunc, this); } } },
  "setComponentVisibility": function(component, visible, applyAt, effect, propertyEffect, ignoreClearTimeout){  var keepVisibility = this.getKey('keepVisibility_' + component.get('id')); if(keepVisibility) return; this.unregisterKey('visibility_'+component.get('id')); var changeVisibility = function(){ if(effect && propertyEffect){ component.set(propertyEffect, effect); } component.set('visible', visible); if(component.get('class') == 'ViewerArea'){ try{ if(visible) component.restart(); else if(component.get('playbackState') == 'playing') component.pause(); } catch(e){}; } }; var effectTimeoutName = 'effectTimeout_'+component.get('id'); if(!ignoreClearTimeout && window.hasOwnProperty(effectTimeoutName)){ var effectTimeout = window[effectTimeoutName]; if(effectTimeout instanceof Array){ for(var i=0; i<effectTimeout.length; i++){ clearTimeout(effectTimeout[i]) } }else{ clearTimeout(effectTimeout); } delete window[effectTimeoutName]; } else if(visible == component.get('visible') && !ignoreClearTimeout) return; if(applyAt && applyAt > 0){ var effectTimeout = setTimeout(function(){ if(window[effectTimeoutName] instanceof Array) { var arrayTimeoutVal = window[effectTimeoutName]; var index = arrayTimeoutVal.indexOf(effectTimeout); arrayTimeoutVal.splice(index, 1); if(arrayTimeoutVal.length == 0){ delete window[effectTimeoutName]; } }else{ delete window[effectTimeoutName]; } changeVisibility(); }, applyAt); if(window.hasOwnProperty(effectTimeoutName)){ window[effectTimeoutName] = [window[effectTimeoutName], effectTimeout]; }else{ window[effectTimeoutName] = effectTimeout; } } else{ changeVisibility(); } },
  "pauseGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; } if(audio.get('state') == 'playing') audio.pause(); },
  "getKey": function(key){  return window[key]; },
  "fixTogglePlayPauseButton": function(player){  var state = player.get('state'); var buttons = player.get('buttonPlayPause'); if(typeof buttons !== 'undefined' && player.get('state') == 'playing'){ if(!Array.isArray(buttons)) buttons = [buttons]; for(var i = 0; i<buttons.length; ++i) buttons[i].set('pressed', true); } },
  "setOverlayBehaviour": function(overlay, media, action){  var executeFunc = function() { switch(action){ case 'triggerClick': this.triggerOverlay(overlay, 'click'); break; case 'stop': case 'play': case 'pause': overlay[action](); break; case 'togglePlayPause': case 'togglePlayStop': if(overlay.get('state') == 'playing') overlay[action == 'togglePlayPause' ? 'pause' : 'stop'](); else overlay.play(); break; } if(window.overlaysDispatched == undefined) window.overlaysDispatched = {}; var id = overlay.get('id'); window.overlaysDispatched[id] = true; setTimeout(function(){ delete window.overlaysDispatched[id]; }, 2000); }; if(window.overlaysDispatched != undefined && overlay.get('id') in window.overlaysDispatched) return; var playList = this.getPlayListWithMedia(media, true); if(playList != undefined){ var item = this.getPlayListItemByMedia(playList, media); if(playList.get('items').indexOf(item) != playList.get('selectedIndex')){ var beginFunc = function(e){ item.unbind('begin', beginFunc, this); executeFunc.call(this); }; item.bind('begin', beginFunc, this); return; } } executeFunc.call(this); },
  "resumePlayers": function(players, onlyResumeCameraIfPanorama){  for(var i = 0; i<players.length; ++i){ var player = players[i]; if(onlyResumeCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.resumeCamera(); } else{ player.play(); } } },
  "changePlayListWithSameSpot": function(playList, newIndex){  var currentIndex = playList.get('selectedIndex'); if (currentIndex >= 0 && newIndex >= 0 && currentIndex != newIndex) { var currentItem = playList.get('items')[currentIndex]; var newItem = playList.get('items')[newIndex]; var currentPlayer = currentItem.get('player'); var newPlayer = newItem.get('player'); if ((currentPlayer.get('class') == 'PanoramaPlayer' || currentPlayer.get('class') == 'Video360Player') && (newPlayer.get('class') == 'PanoramaPlayer' || newPlayer.get('class') == 'Video360Player')) { var newCamera = this.cloneCamera(newItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, currentItem.get('media')); this.startPanoramaWithCamera(newItem.get('media'), newCamera); } } },
  "showWindow": function(w, autoCloseMilliSeconds, containsAudio){  if(w.get('visible') == true){ return; } var closeFunction = function(){ clearAutoClose(); this.resumePlayers(playersPaused, !containsAudio); w.unbind('close', closeFunction, this); }; var clearAutoClose = function(){ w.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ w.hide(); }; w.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } var playersPaused = this.pauseCurrentPlayers(!containsAudio); w.bind('close', closeFunction, this); w.show(this, true); },
  "showPopupImage": function(image, toggleImage, customWidth, customHeight, showEffect, hideEffect, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedCallback, hideCallback){  var self = this; var closed = false; var playerClickFunction = function() { zoomImage.unbind('loaded', loadedFunction, self); hideFunction(); }; var clearAutoClose = function(){ zoomImage.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var resizeFunction = function(){ setTimeout(setCloseButtonPosition, 0); }; var loadedFunction = function(){ self.unbind('click', playerClickFunction, self); veil.set('visible', true); setCloseButtonPosition(); closeButton.set('visible', true); zoomImage.unbind('loaded', loadedFunction, this); zoomImage.bind('userInteractionStart', userInteractionStartFunction, this); zoomImage.bind('userInteractionEnd', userInteractionEndFunction, this); zoomImage.bind('resize', resizeFunction, this); timeoutID = setTimeout(timeoutFunction, 200); }; var timeoutFunction = function(){ timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ hideFunction(); }; zoomImage.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } zoomImage.bind('backgroundClick', hideFunction, this); if(toggleImage) { zoomImage.bind('click', toggleFunction, this); zoomImage.set('imageCursor', 'hand'); } closeButton.bind('click', hideFunction, this); if(loadedCallback) loadedCallback(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); closed = true; if(timeoutID) clearTimeout(timeoutID); if (timeoutUserInteractionID) clearTimeout(timeoutUserInteractionID); if(autoCloseMilliSeconds) clearAutoClose(); if(hideCallback) hideCallback(); zoomImage.set('visible', false); if(hideEffect && hideEffect.get('duration') > 0){ hideEffect.bind('end', endEffectFunction, this); } else{ zoomImage.set('image', null); } closeButton.set('visible', false); veil.set('visible', false); self.unbind('click', playerClickFunction, self); zoomImage.unbind('backgroundClick', hideFunction, this); zoomImage.unbind('userInteractionStart', userInteractionStartFunction, this); zoomImage.unbind('userInteractionEnd', userInteractionEndFunction, this, true); zoomImage.unbind('resize', resizeFunction, this); if(toggleImage) { zoomImage.unbind('click', toggleFunction, this); zoomImage.set('cursor', 'default'); } closeButton.unbind('click', hideFunction, this); self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } }; var endEffectFunction = function() { zoomImage.set('image', null); hideEffect.unbind('end', endEffectFunction, this); }; var toggleFunction = function() { zoomImage.set('image', isToggleVisible() ? image : toggleImage); }; var isToggleVisible = function() { return zoomImage.get('image') == toggleImage; }; var setCloseButtonPosition = function() { var right = zoomImage.get('actualWidth') - zoomImage.get('imageLeft') - zoomImage.get('imageWidth') + 10; var top = zoomImage.get('imageTop') + 10; if(right < 10) right = 10; if(top < 10) top = 10; closeButton.set('right', right); closeButton.set('top', top); }; var userInteractionStartFunction = function() { if(timeoutUserInteractionID){ clearTimeout(timeoutUserInteractionID); timeoutUserInteractionID = undefined; } else{ closeButton.set('visible', false); } }; var userInteractionEndFunction = function() { if(!closed){ timeoutUserInteractionID = setTimeout(userInteractionTimeoutFunction, 300); } }; var userInteractionTimeoutFunction = function() { timeoutUserInteractionID = undefined; closeButton.set('visible', true); setCloseButtonPosition(); }; this.MainViewer.set('toolTipEnabled', false); var veil = this.veilPopupPanorama; var zoomImage = this.zoomImagePopupPanorama; var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } var timeoutID = undefined; var timeoutUserInteractionID = undefined; zoomImage.bind('loaded', loadedFunction, this); setTimeout(function(){ self.bind('click', playerClickFunction, self, false); }, 0); zoomImage.set('image', image); zoomImage.set('customWidth', customWidth); zoomImage.set('customHeight', customHeight); zoomImage.set('showEffect', showEffect); zoomImage.set('hideEffect', hideEffect); zoomImage.set('visible', true); return zoomImage; },
  "shareTwitter": function(url){  window.open('https://twitter.com/intent/tweet?source=webclient&url=' + url, '_blank'); },
  "getGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios != undefined && audio.get('id') in audios){ audio = audios[audio.get('id')]; } return audio; },
  "registerKey": function(key, value){  window[key] = value; },
  "startPanoramaWithCamera": function(media, camera){  if(window.currentPanoramasWithCameraChanged != undefined && window.currentPanoramasWithCameraChanged.indexOf(media) != -1){ return; } var playLists = this.getByClassName('PlayList'); if(playLists.length == 0) return; var restoreItems = []; for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media && (item.get('class') == 'PanoramaPlayListItem' || item.get('class') == 'Video360PlayListItem')){ restoreItems.push({camera: item.get('camera'), item: item}); item.set('camera', camera); } } } if(restoreItems.length > 0) { if(window.currentPanoramasWithCameraChanged == undefined) { window.currentPanoramasWithCameraChanged = [media]; } else { window.currentPanoramasWithCameraChanged.push(media); } var restoreCameraOnStop = function(){ var index = window.currentPanoramasWithCameraChanged.indexOf(media); if(index != -1) { window.currentPanoramasWithCameraChanged.splice(index, 1); } for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.set('camera', restoreItems[i].camera); restoreItems[i].item.unbind('stop', restoreCameraOnStop, this); } }; for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.bind('stop', restoreCameraOnStop, this); } } },
  "executeFunctionWhenChange": function(playList, index, endFunction, changeFunction){  var endObject = undefined; var changePlayListFunction = function(event){ if(event.data.previousSelectedIndex == index){ if(changeFunction) changeFunction.call(this); if(endFunction && endObject) endObject.unbind('end', endFunction, this); playList.unbind('change', changePlayListFunction, this); } }; if(endFunction){ var playListItem = playList.get('items')[index]; if(playListItem.get('class') == 'PanoramaPlayListItem'){ var camera = playListItem.get('camera'); if(camera != undefined) endObject = camera.get('initialSequence'); if(endObject == undefined) endObject = camera.get('idleSequence'); } else{ endObject = playListItem.get('media'); } if(endObject){ endObject.bind('end', endFunction, this); } } playList.bind('change', changePlayListFunction, this); },
  "keepComponentVisibility": function(component, keep){  var key = 'keepVisibility_' + component.get('id'); var value = this.getKey(key); if(value == undefined && keep) { this.registerKey(key, keep); } else if(value != undefined && !keep) { this.unregisterKey(key); } }
 },
 "minHeight": 20,
 "paddingLeft": 0,
 "downloadEnabled": false,
 "paddingRight": 0,
 "verticalAlign": "top",
 "minWidth": 20,
 "layout": "absolute",
 "borderRadius": 0,
 "definitions": [{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -0.92,
  "pitch": 0
 },
 "id": "camera_B3BE69A5_A4BF_CC0C_41E2_4E96071A3A26",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_AC7F4CD7_A03D_3972_41E0_8C39A26E1110_camera",
 "automaticZoomSpeed": 10
},
{
 "label": "04",
 "id": "panorama_973F645F_9AF8_47D2_41E0_B0897350E0C8",
 "hfov": 360,
 "class": "Panorama",
 "pitch": 0,
 "hfovMin": "150%",
 "hfovMax": 130,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_973F645F_9AF8_47D2_41E0_B0897350E0C8_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_973F645F_9AF8_47D2_41E0_B0897350E0C8_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_973F645F_9AF8_47D2_41E0_B0897350E0C8_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_973F645F_9AF8_47D2_41E0_B0897350E0C8_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_973F645F_9AF8_47D2_41E0_B0897350E0C8_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_973F645F_9AF8_47D2_41E0_B0897350E0C8_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_973F645F_9AF8_47D2_41E0_B0897350E0C8_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_973F645F_9AF8_47D2_41E0_B0897350E0C8_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_973F645F_9AF8_47D2_41E0_B0897350E0C8_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_973F645F_9AF8_47D2_41E0_B0897350E0C8_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_973F645F_9AF8_47D2_41E0_B0897350E0C8_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_973F645F_9AF8_47D2_41E0_B0897350E0C8_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_973F645F_9AF8_47D2_41E0_B0897350E0C8_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_973F645F_9AF8_47D2_41E0_B0897350E0C8_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_973F645F_9AF8_47D2_41E0_B0897350E0C8_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_973F645F_9AF8_47D2_41E0_B0897350E0C8_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_973F645F_9AF8_47D2_41E0_B0897350E0C8_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_973F645F_9AF8_47D2_41E0_B0897350E0C8_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_973F645F_9AF8_47D2_41E0_B0897350E0C8_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_9756801D_9AF8_7F51_41D5_4F35EEFD08D7"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_976DEE06_9AFB_C333_41CD_161BBA331BF3"
  }
 ],
 "vfov": 180,
 "thumbnailUrl": "media/panorama_973F645F_9AF8_47D2_41E0_B0897350E0C8_t.jpg",
 "overlays": [
  "this.overlay_B62E0792_9A58_4153_4160_5AD338B0BE3E",
  "this.overlay_FB7BCD23_9E28_4171_41D3_60E7AE36D880"
 ],
 "partial": false
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0.03,
  "pitch": -1.87
 },
 "id": "panorama_9756801D_9AF8_7F51_41D5_4F35EEFD08D7_camera",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 133.16,
  "pitch": -0.92
 },
 "id": "camera_B309FAED_A4BF_CC1C_41B8_88EC64689BCE",
 "automaticZoomSpeed": 10
},
{
 "label": "02",
 "id": "panorama_948E6B0A_9AFB_C133_41DC_F671C97DAA71",
 "hfov": 360,
 "class": "Panorama",
 "pitch": 0,
 "hfovMin": "150%",
 "hfovMax": 130,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_948E6B0A_9AFB_C133_41DC_F671C97DAA71_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_948E6B0A_9AFB_C133_41DC_F671C97DAA71_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_948E6B0A_9AFB_C133_41DC_F671C97DAA71_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_948E6B0A_9AFB_C133_41DC_F671C97DAA71_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_948E6B0A_9AFB_C133_41DC_F671C97DAA71_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_948E6B0A_9AFB_C133_41DC_F671C97DAA71_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_948E6B0A_9AFB_C133_41DC_F671C97DAA71_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_948E6B0A_9AFB_C133_41DC_F671C97DAA71_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_948E6B0A_9AFB_C133_41DC_F671C97DAA71_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_948E6B0A_9AFB_C133_41DC_F671C97DAA71_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_948E6B0A_9AFB_C133_41DC_F671C97DAA71_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_948E6B0A_9AFB_C133_41DC_F671C97DAA71_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_948E6B0A_9AFB_C133_41DC_F671C97DAA71_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_948E6B0A_9AFB_C133_41DC_F671C97DAA71_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_948E6B0A_9AFB_C133_41DC_F671C97DAA71_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_948E6B0A_9AFB_C133_41DC_F671C97DAA71_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_948E6B0A_9AFB_C133_41DC_F671C97DAA71_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_948E6B0A_9AFB_C133_41DC_F671C97DAA71_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_948E6B0A_9AFB_C133_41DC_F671C97DAA71_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_91FB4A68_9A28_C3FF_41D0_DA40E82F270F"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_9726B933_9AF8_C151_4198_716A8AE76373"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_976DEE06_9AFB_C333_41CD_161BBA331BF3"
  }
 ],
 "vfov": 180,
 "thumbnailUrl": "media/panorama_948E6B0A_9AFB_C133_41DC_F671C97DAA71_t.jpg",
 "overlays": [
  "this.overlay_82726B65_9A38_C1F1_41CF_B497229303FB",
  "this.overlay_11A5FC07_9E38_4731_41D0_E5585982ED57",
  "this.overlay_37A429A5_9E28_4171_41CC_6D0EBB45DE79"
 ],
 "partial": false
},
{
 "label": "07",
 "id": "panorama_949325FC_9AF8_40D7_41BE_02E2561CD0FF",
 "hfov": 360,
 "class": "Panorama",
 "pitch": 0,
 "hfovMin": "150%",
 "hfovMax": 130,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_949325FC_9AF8_40D7_41BE_02E2561CD0FF_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_949325FC_9AF8_40D7_41BE_02E2561CD0FF_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_949325FC_9AF8_40D7_41BE_02E2561CD0FF_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_949325FC_9AF8_40D7_41BE_02E2561CD0FF_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_949325FC_9AF8_40D7_41BE_02E2561CD0FF_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_949325FC_9AF8_40D7_41BE_02E2561CD0FF_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_949325FC_9AF8_40D7_41BE_02E2561CD0FF_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_949325FC_9AF8_40D7_41BE_02E2561CD0FF_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_949325FC_9AF8_40D7_41BE_02E2561CD0FF_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_949325FC_9AF8_40D7_41BE_02E2561CD0FF_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_949325FC_9AF8_40D7_41BE_02E2561CD0FF_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_949325FC_9AF8_40D7_41BE_02E2561CD0FF_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_949325FC_9AF8_40D7_41BE_02E2561CD0FF_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_949325FC_9AF8_40D7_41BE_02E2561CD0FF_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_949325FC_9AF8_40D7_41BE_02E2561CD0FF_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_949325FC_9AF8_40D7_41BE_02E2561CD0FF_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_949325FC_9AF8_40D7_41BE_02E2561CD0FF_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_949325FC_9AF8_40D7_41BE_02E2561CD0FF_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_949325FC_9AF8_40D7_41BE_02E2561CD0FF_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_974B7AA7_9AF8_4371_41CB_FA8F4BF6737D",
   "yaw": -152.73,
   "backwardYaw": 138.47,
   "distance": 1
  }
 ],
 "vfov": 180,
 "thumbnailUrl": "media/panorama_949325FC_9AF8_40D7_41BE_02E2561CD0FF_t.jpg",
 "overlays": [
  "this.overlay_CE92518C_9DEB_C137_41CA_5A69BFB05CD9"
 ],
 "partial": false
},
{
 "label": "06",
 "id": "panorama_974B7AA7_9AF8_4371_41CB_FA8F4BF6737D",
 "hfov": 360,
 "class": "Panorama",
 "pitch": 0,
 "hfovMin": "150%",
 "hfovMax": 130,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_974B7AA7_9AF8_4371_41CB_FA8F4BF6737D_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_974B7AA7_9AF8_4371_41CB_FA8F4BF6737D_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_974B7AA7_9AF8_4371_41CB_FA8F4BF6737D_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_974B7AA7_9AF8_4371_41CB_FA8F4BF6737D_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_974B7AA7_9AF8_4371_41CB_FA8F4BF6737D_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_974B7AA7_9AF8_4371_41CB_FA8F4BF6737D_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_974B7AA7_9AF8_4371_41CB_FA8F4BF6737D_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_974B7AA7_9AF8_4371_41CB_FA8F4BF6737D_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_974B7AA7_9AF8_4371_41CB_FA8F4BF6737D_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_974B7AA7_9AF8_4371_41CB_FA8F4BF6737D_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_974B7AA7_9AF8_4371_41CB_FA8F4BF6737D_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_974B7AA7_9AF8_4371_41CB_FA8F4BF6737D_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_974B7AA7_9AF8_4371_41CB_FA8F4BF6737D_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_974B7AA7_9AF8_4371_41CB_FA8F4BF6737D_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_974B7AA7_9AF8_4371_41CB_FA8F4BF6737D_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_974B7AA7_9AF8_4371_41CB_FA8F4BF6737D_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_974B7AA7_9AF8_4371_41CB_FA8F4BF6737D_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_974B7AA7_9AF8_4371_41CB_FA8F4BF6737D_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_974B7AA7_9AF8_4371_41CB_FA8F4BF6737D_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_9756801D_9AF8_7F51_41D5_4F35EEFD08D7"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_949325FC_9AF8_40D7_41BE_02E2561CD0FF",
   "yaw": 138.47,
   "backwardYaw": -152.73,
   "distance": 1
  }
 ],
 "vfov": 180,
 "thumbnailUrl": "media/panorama_974B7AA7_9AF8_4371_41CB_FA8F4BF6737D_t.jpg",
 "overlays": [
  "this.overlay_AE21B35D_9BE9_C1D1_41A3_4407D2447994",
  "this.overlay_A306F95F_9BE8_41D2_41CD_A54D760A4157"
 ],
 "partial": false
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_949325FC_9AF8_40D7_41BE_02E2561CD0FF_camera",
 "automaticZoomSpeed": 10
},
{
 "class": "PlayList",
 "items": [
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_91FB4A68_9A28_C3FF_41D0_DA40E82F270F_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 0, 1)",
   "media": "this.panorama_91FB4A68_9A28_C3FF_41D0_DA40E82F270F",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_948E6B0A_9AFB_C133_41DC_F671C97DAA71_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 1, 2)",
   "media": "this.panorama_948E6B0A_9AFB_C133_41DC_F671C97DAA71",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_976DEE06_9AFB_C333_41CD_161BBA331BF3_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 2, 3)",
   "media": "this.panorama_976DEE06_9AFB_C333_41CD_161BBA331BF3",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_973F645F_9AF8_47D2_41E0_B0897350E0C8_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 3, 4)",
   "media": "this.panorama_973F645F_9AF8_47D2_41E0_B0897350E0C8",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_9756801D_9AF8_7F51_41D5_4F35EEFD08D7_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 4, 5)",
   "media": "this.panorama_9756801D_9AF8_7F51_41D5_4F35EEFD08D7",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_974B7AA7_9AF8_4371_41CB_FA8F4BF6737D_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 5, 6)",
   "media": "this.panorama_974B7AA7_9AF8_4371_41CB_FA8F4BF6737D",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_949325FC_9AF8_40D7_41BE_02E2561CD0FF_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 6, 7)",
   "media": "this.panorama_949325FC_9AF8_40D7_41BE_02E2561CD0FF",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_97FF00C0_9AF8_3F2E_41E1_689B7996A1D3_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 7, 8)",
   "media": "this.panorama_97FF00C0_9AF8_3F2E_41E1_689B7996A1D3",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_97C88C72_9AF8_C7D2_41DE_14AF882F2CA7_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 8, 9)",
   "media": "this.panorama_97C88C72_9AF8_C7D2_41DE_14AF882F2CA7",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_AC7F4CD7_A03D_3972_41E0_8C39A26E1110_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 9, 10)",
   "media": "this.panorama_AC7F4CD7_A03D_3972_41E0_8C39A26E1110",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_97FDD82A_9AF8_CF73_41C9_6DC675D1A8AA_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 10, 11)",
   "media": "this.panorama_97FDD82A_9AF8_CF73_41C9_6DC675D1A8AA",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_949EC2DE_9AF8_C0D2_41D9_CED93B021FE5_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 11, 12)",
   "media": "this.panorama_949EC2DE_9AF8_C0D2_41D9_CED93B021FE5",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "end": "this.trigger('tourEnded')",
   "player": "this.MainViewerPanoramaPlayer",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 12, 0)",
   "media": "this.panorama_9726B933_9AF8_C151_4198_716A8AE76373",
   "camera": "this.panorama_9726B933_9AF8_C151_4198_716A8AE76373_camera"
  }
 ],
 "id": "mainPlayList"
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "hfov": 120,
  "class": "PanoramaCameraPosition",
  "yaw": 178.16,
  "pitch": 0.92
 },
 "id": "camera_B3B7A985_A4BF_CC0F_41E1_2C6289214F24",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaPlayer",
 "touchControlMode": "drag_rotation",
 "gyroscopeVerticalDraggingEnabled": true,
 "mouseControlMode": "drag_acceleration",
 "id": "MainViewerPanoramaPlayer",
 "viewerArea": "this.MainViewer",
 "displayPlaybackBar": true,
 "gyroscopeEnabled": true
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 27.27,
  "pitch": 0
 },
 "id": "camera_B3F04A50_A4BF_CC05_41E2_E68EDB8F2E83",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "hfov": 120,
  "class": "PanoramaCameraPosition",
  "yaw": 1.81,
  "pitch": -0.36
 },
 "id": "panorama_948E6B0A_9AFB_C133_41DC_F671C97DAA71_camera",
 "automaticZoomSpeed": 10
},
{
 "label": "05",
 "id": "panorama_9756801D_9AF8_7F51_41D5_4F35EEFD08D7",
 "hfov": 360,
 "class": "Panorama",
 "pitch": 0,
 "hfovMin": "150%",
 "hfovMax": 130,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9756801D_9AF8_7F51_41D5_4F35EEFD08D7_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_9756801D_9AF8_7F51_41D5_4F35EEFD08D7_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_9756801D_9AF8_7F51_41D5_4F35EEFD08D7_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9756801D_9AF8_7F51_41D5_4F35EEFD08D7_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_9756801D_9AF8_7F51_41D5_4F35EEFD08D7_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_9756801D_9AF8_7F51_41D5_4F35EEFD08D7_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9756801D_9AF8_7F51_41D5_4F35EEFD08D7_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_9756801D_9AF8_7F51_41D5_4F35EEFD08D7_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_9756801D_9AF8_7F51_41D5_4F35EEFD08D7_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_9756801D_9AF8_7F51_41D5_4F35EEFD08D7_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9756801D_9AF8_7F51_41D5_4F35EEFD08D7_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_9756801D_9AF8_7F51_41D5_4F35EEFD08D7_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_9756801D_9AF8_7F51_41D5_4F35EEFD08D7_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9756801D_9AF8_7F51_41D5_4F35EEFD08D7_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_9756801D_9AF8_7F51_41D5_4F35EEFD08D7_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_9756801D_9AF8_7F51_41D5_4F35EEFD08D7_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9756801D_9AF8_7F51_41D5_4F35EEFD08D7_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_9756801D_9AF8_7F51_41D5_4F35EEFD08D7_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_9756801D_9AF8_7F51_41D5_4F35EEFD08D7_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_97FF00C0_9AF8_3F2E_41E1_689B7996A1D3"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_973F645F_9AF8_47D2_41E0_B0897350E0C8"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_974B7AA7_9AF8_4371_41CB_FA8F4BF6737D"
  }
 ],
 "vfov": 180,
 "thumbnailUrl": "media/panorama_9756801D_9AF8_7F51_41D5_4F35EEFD08D7_t.jpg",
 "overlays": [
  "this.overlay_B508C3CA_9BEB_C132_41D3_27C0793DFD0E",
  "this.overlay_B431B761_9BF8_C1F1_41AE_792FD15F56CE",
  "this.overlay_FBC9409E_9DE8_7F53_41E2_E790EF9DB745"
 ],
 "partial": false
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 85.41,
  "pitch": -0.92
 },
 "id": "camera_B3E6DA22_A4BF_CC04_41CB_B271ABC805A7",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 100.36,
  "pitch": -0.92
 },
 "id": "camera_B340BB4A_A4BF_CC05_41E1_677D21CBAA4A",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 88.16,
  "pitch": -1.84
 },
 "id": "camera_B32E4ACD_A4BF_CC1F_41D8_653EE949CE38",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_9726B933_9AF8_C151_4198_716A8AE76373_camera",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "camera_B38A49C4_A4BF_CC0C_41CD_7A983ADFBC7D",
 "automaticZoomSpeed": 10
},
{
 "label": "03",
 "id": "panorama_976DEE06_9AFB_C333_41CD_161BBA331BF3",
 "hfov": 360,
 "class": "Panorama",
 "pitch": 0,
 "hfovMin": "150%",
 "hfovMax": 130,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_976DEE06_9AFB_C333_41CD_161BBA331BF3_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_976DEE06_9AFB_C333_41CD_161BBA331BF3_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_976DEE06_9AFB_C333_41CD_161BBA331BF3_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_976DEE06_9AFB_C333_41CD_161BBA331BF3_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_976DEE06_9AFB_C333_41CD_161BBA331BF3_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_976DEE06_9AFB_C333_41CD_161BBA331BF3_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_976DEE06_9AFB_C333_41CD_161BBA331BF3_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_976DEE06_9AFB_C333_41CD_161BBA331BF3_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_976DEE06_9AFB_C333_41CD_161BBA331BF3_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_976DEE06_9AFB_C333_41CD_161BBA331BF3_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_976DEE06_9AFB_C333_41CD_161BBA331BF3_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_976DEE06_9AFB_C333_41CD_161BBA331BF3_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_976DEE06_9AFB_C333_41CD_161BBA331BF3_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_976DEE06_9AFB_C333_41CD_161BBA331BF3_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_976DEE06_9AFB_C333_41CD_161BBA331BF3_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_976DEE06_9AFB_C333_41CD_161BBA331BF3_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_976DEE06_9AFB_C333_41CD_161BBA331BF3_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_976DEE06_9AFB_C333_41CD_161BBA331BF3_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_976DEE06_9AFB_C333_41CD_161BBA331BF3_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_948E6B0A_9AFB_C133_41DC_F671C97DAA71"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_AC7F4CD7_A03D_3972_41E0_8C39A26E1110"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_973F645F_9AF8_47D2_41E0_B0897350E0C8"
  }
 ],
 "vfov": 180,
 "thumbnailUrl": "media/panorama_976DEE06_9AFB_C333_41CD_161BBA331BF3_t.jpg",
 "overlays": [
  "this.overlay_B3322B39_9A79_C151_41D2_52112B015488",
  "this.overlay_F29CFC5C_9E58_47D6_41D4_85DAD2BC7493",
  "this.overlay_0F4EFC95_9E38_4751_41D0_F7FFEF5326AD"
 ],
 "partial": false
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0.92,
  "pitch": -6.43
 },
 "id": "camera_BCA3FB6A_A4BF_CC04_41D3_540652C769D2",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_973F645F_9AF8_47D2_41E0_B0897350E0C8_camera",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_949EC2DE_9AF8_C0D2_41D9_CED93B021FE5_camera",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -180,
  "pitch": -11.94
 },
 "id": "camera_B3773B2B_A4BF_CC1B_4194_E2ADA7A6AC5F",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "hfov": 120,
  "class": "PanoramaCameraPosition",
  "yaw": 94.59,
  "pitch": -0.92
 },
 "id": "camera_B39489F3_A4BF_CC04_41CF_A10AD83611A6",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "hfov": 119,
  "class": "PanoramaCameraPosition",
  "yaw": 90.92,
  "pitch": -3.67
 },
 "id": "camera_B3C27A7F_A4BF_CCFB_41C7_CC10DADE039E",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -46.74,
  "pitch": 1.61
 },
 "id": "panorama_976DEE06_9AFB_C333_41CD_161BBA331BF3_camera",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "displayMovements": [
  {
   "duration": 1500,
   "class": "TargetRotationalCameraDisplayMovement",
   "easing": "linear"
  },
  {
   "duration": 2000,
   "targetStereographicFactor": 0,
   "class": "TargetRotationalCameraDisplayMovement",
   "targetPitch": -0.74,
   "easing": "cubic_in_out",
   "targetHfov": 120
  }
 ],
 "initialPosition": {
  "hfov": 120,
  "class": "PanoramaCameraPosition",
  "yaw": -3.76,
  "pitch": -0.74
 },
 "id": "panorama_91FB4A68_9A28_C3FF_41D0_DA40E82F270F_camera",
 "displayOriginPosition": {
  "hfov": 165,
  "class": "RotationalCameraDisplayPosition",
  "yaw": -3.76,
  "pitch": -90,
  "stereographicFactor": 1
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -41.53,
  "pitch": 0
 },
 "id": "camera_B3DCAABE_A4BF_CC7C_41D9_8046EFC62061",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -11,
  "pitch": -1.06
 },
 "id": "panorama_97C88C72_9AF8_C7D2_41DE_14AF882F2CA7_camera",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "hfov": 119,
  "class": "PanoramaCameraPosition",
  "yaw": 1.14,
  "pitch": -2.26
 },
 "id": "panorama_97FF00C0_9AF8_3F2E_41E1_689B7996A1D3_camera",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 178.16,
  "pitch": 0
 },
 "id": "camera_B3521B5A_A4BF_CC05_419D_047C73EFAC84",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -1.84,
  "pitch": 0
 },
 "id": "camera_B365AB1C_A4BF_CC3C_41C9_E1C8F03CF038",
 "automaticZoomSpeed": 10
},
{
 "label": "Casa Muestra!",
 "id": "panorama_91FB4A68_9A28_C3FF_41D0_DA40E82F270F",
 "hfov": 360,
 "class": "Panorama",
 "pitch": 0,
 "hfovMin": "150%",
 "hfovMax": 130,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_91FB4A68_9A28_C3FF_41D0_DA40E82F270F_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_91FB4A68_9A28_C3FF_41D0_DA40E82F270F_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_91FB4A68_9A28_C3FF_41D0_DA40E82F270F_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_91FB4A68_9A28_C3FF_41D0_DA40E82F270F_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_91FB4A68_9A28_C3FF_41D0_DA40E82F270F_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_91FB4A68_9A28_C3FF_41D0_DA40E82F270F_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_91FB4A68_9A28_C3FF_41D0_DA40E82F270F_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_91FB4A68_9A28_C3FF_41D0_DA40E82F270F_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_91FB4A68_9A28_C3FF_41D0_DA40E82F270F_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_91FB4A68_9A28_C3FF_41D0_DA40E82F270F_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_91FB4A68_9A28_C3FF_41D0_DA40E82F270F_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_91FB4A68_9A28_C3FF_41D0_DA40E82F270F_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_91FB4A68_9A28_C3FF_41D0_DA40E82F270F_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_948E6B0A_9AFB_C133_41DC_F671C97DAA71"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_9726B933_9AF8_C151_4198_716A8AE76373"
  }
 ],
 "vfov": 180,
 "thumbnailUrl": "media/panorama_91FB4A68_9A28_C3FF_41D0_DA40E82F270F_t.jpg",
 "overlays": [
  "this.overlay_82D45E2E_9A38_4373_41DA_DCB0EE38687B",
  "this.overlay_39157C50_9E28_472F_41D8_6F81604DD637"
 ],
 "partial": false
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -45,
  "pitch": -0.92
 },
 "id": "camera_B3D31A9F_A4BF_CC3C_41DA_FEA42C1015D1",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -172.65,
  "pitch": 0.92
 },
 "id": "camera_B3386ADD_A4BF_CC3F_41D6_9996BD90377A",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_97FDD82A_9AF8_CF73_41C9_6DC675D1A8AA_camera",
 "automaticZoomSpeed": 10
},
{
 "label": "11",
 "id": "panorama_97FDD82A_9AF8_CF73_41C9_6DC675D1A8AA",
 "hfov": 360,
 "class": "Panorama",
 "pitch": 0,
 "hfovMin": "150%",
 "hfovMax": 130,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_97FDD82A_9AF8_CF73_41C9_6DC675D1A8AA_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_97FDD82A_9AF8_CF73_41C9_6DC675D1A8AA_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_97FDD82A_9AF8_CF73_41C9_6DC675D1A8AA_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_97FDD82A_9AF8_CF73_41C9_6DC675D1A8AA_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_97FDD82A_9AF8_CF73_41C9_6DC675D1A8AA_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_97FDD82A_9AF8_CF73_41C9_6DC675D1A8AA_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_97FDD82A_9AF8_CF73_41C9_6DC675D1A8AA_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_97FDD82A_9AF8_CF73_41C9_6DC675D1A8AA_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_97FDD82A_9AF8_CF73_41C9_6DC675D1A8AA_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_97FDD82A_9AF8_CF73_41C9_6DC675D1A8AA_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_97FDD82A_9AF8_CF73_41C9_6DC675D1A8AA_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_97FDD82A_9AF8_CF73_41C9_6DC675D1A8AA_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_97FDD82A_9AF8_CF73_41C9_6DC675D1A8AA_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_97FDD82A_9AF8_CF73_41C9_6DC675D1A8AA_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_97FDD82A_9AF8_CF73_41C9_6DC675D1A8AA_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_97FDD82A_9AF8_CF73_41C9_6DC675D1A8AA_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_97FDD82A_9AF8_CF73_41C9_6DC675D1A8AA_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_97FDD82A_9AF8_CF73_41C9_6DC675D1A8AA_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_97FDD82A_9AF8_CF73_41C9_6DC675D1A8AA_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_949EC2DE_9AF8_C0D2_41D9_CED93B021FE5"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_AC7F4CD7_A03D_3972_41E0_8C39A26E1110"
  }
 ],
 "vfov": 180,
 "thumbnailUrl": "media/panorama_97FDD82A_9AF8_CF73_41C9_6DC675D1A8AA_t.jpg",
 "overlays": [
  "this.overlay_1E831F0E_9E78_C133_41E3_5A49A3467F96",
  "this.overlay_1AC88FA8_9E28_C17F_41C3_415EE4074754"
 ],
 "partial": false
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_974B7AA7_9AF8_4371_41CB_FA8F4BF6737D_camera",
 "automaticZoomSpeed": 10
},
{
 "label": "14",
 "id": "panorama_9726B933_9AF8_C151_4198_716A8AE76373",
 "hfov": 360,
 "class": "Panorama",
 "pitch": 0,
 "hfovMin": "150%",
 "hfovMax": 130,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9726B933_9AF8_C151_4198_716A8AE76373_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_9726B933_9AF8_C151_4198_716A8AE76373_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_9726B933_9AF8_C151_4198_716A8AE76373_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9726B933_9AF8_C151_4198_716A8AE76373_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_9726B933_9AF8_C151_4198_716A8AE76373_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_9726B933_9AF8_C151_4198_716A8AE76373_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9726B933_9AF8_C151_4198_716A8AE76373_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_9726B933_9AF8_C151_4198_716A8AE76373_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_9726B933_9AF8_C151_4198_716A8AE76373_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_9726B933_9AF8_C151_4198_716A8AE76373_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9726B933_9AF8_C151_4198_716A8AE76373_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_9726B933_9AF8_C151_4198_716A8AE76373_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_9726B933_9AF8_C151_4198_716A8AE76373_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9726B933_9AF8_C151_4198_716A8AE76373_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_9726B933_9AF8_C151_4198_716A8AE76373_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_9726B933_9AF8_C151_4198_716A8AE76373_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9726B933_9AF8_C151_4198_716A8AE76373_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_9726B933_9AF8_C151_4198_716A8AE76373_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_9726B933_9AF8_C151_4198_716A8AE76373_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_949EC2DE_9AF8_C0D2_41D9_CED93B021FE5"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_948E6B0A_9AFB_C133_41DC_F671C97DAA71"
  }
 ],
 "vfov": 180,
 "thumbnailUrl": "media/panorama_9726B933_9AF8_C151_4198_716A8AE76373_t.jpg",
 "overlays": [
  "this.overlay_147F82CE_9E68_4333_41DB_F060E05EE236",
  "this.overlay_B08E86F4_A05D_C937_41D3_71704E859301"
 ],
 "partial": false
},
{
 "label": "08",
 "id": "panorama_97FF00C0_9AF8_3F2E_41E1_689B7996A1D3",
 "hfov": 360,
 "class": "Panorama",
 "pitch": 0,
 "hfovMin": "150%",
 "hfovMax": 121,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_97FF00C0_9AF8_3F2E_41E1_689B7996A1D3_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_97FF00C0_9AF8_3F2E_41E1_689B7996A1D3_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_97FF00C0_9AF8_3F2E_41E1_689B7996A1D3_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_97FF00C0_9AF8_3F2E_41E1_689B7996A1D3_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_97FF00C0_9AF8_3F2E_41E1_689B7996A1D3_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_97FF00C0_9AF8_3F2E_41E1_689B7996A1D3_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_97FF00C0_9AF8_3F2E_41E1_689B7996A1D3_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_97FF00C0_9AF8_3F2E_41E1_689B7996A1D3_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_97FF00C0_9AF8_3F2E_41E1_689B7996A1D3_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_97FF00C0_9AF8_3F2E_41E1_689B7996A1D3_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_97FF00C0_9AF8_3F2E_41E1_689B7996A1D3_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_97FF00C0_9AF8_3F2E_41E1_689B7996A1D3_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_97FF00C0_9AF8_3F2E_41E1_689B7996A1D3_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_97FF00C0_9AF8_3F2E_41E1_689B7996A1D3_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_97FF00C0_9AF8_3F2E_41E1_689B7996A1D3_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_97FF00C0_9AF8_3F2E_41E1_689B7996A1D3_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_97FF00C0_9AF8_3F2E_41E1_689B7996A1D3_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_97FF00C0_9AF8_3F2E_41E1_689B7996A1D3_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_97FF00C0_9AF8_3F2E_41E1_689B7996A1D3_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_97C88C72_9AF8_C7D2_41DE_14AF882F2CA7"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_9756801D_9AF8_7F51_41D5_4F35EEFD08D7"
  }
 ],
 "vfov": 180,
 "thumbnailUrl": "media/panorama_97FF00C0_9AF8_3F2E_41E1_689B7996A1D3_t.jpg",
 "overlays": [
  "this.overlay_AE3067F3_9BF8_40D1_41D8_5705C1553344",
  "this.overlay_AEE1B560_9BE8_C1EF_41C8_210B999FB595"
 ],
 "partial": false
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "hfov": 120,
  "class": "PanoramaCameraPosition",
  "yaw": -172.65,
  "pitch": 2.76
 },
 "id": "camera_B314FB0C_A4BF_CC1D_419A_B75ED70F3F5A",
 "automaticZoomSpeed": 10
},
{
 "label": "10",
 "id": "panorama_AC7F4CD7_A03D_3972_41E0_8C39A26E1110",
 "hfov": 360,
 "class": "Panorama",
 "pitch": 0,
 "hfovMin": "150%",
 "hfovMax": 130,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_AC7F4CD7_A03D_3972_41E0_8C39A26E1110_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_AC7F4CD7_A03D_3972_41E0_8C39A26E1110_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_AC7F4CD7_A03D_3972_41E0_8C39A26E1110_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_AC7F4CD7_A03D_3972_41E0_8C39A26E1110_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_AC7F4CD7_A03D_3972_41E0_8C39A26E1110_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_AC7F4CD7_A03D_3972_41E0_8C39A26E1110_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_AC7F4CD7_A03D_3972_41E0_8C39A26E1110_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_AC7F4CD7_A03D_3972_41E0_8C39A26E1110_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_AC7F4CD7_A03D_3972_41E0_8C39A26E1110_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_AC7F4CD7_A03D_3972_41E0_8C39A26E1110_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_AC7F4CD7_A03D_3972_41E0_8C39A26E1110_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_AC7F4CD7_A03D_3972_41E0_8C39A26E1110_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_AC7F4CD7_A03D_3972_41E0_8C39A26E1110_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_AC7F4CD7_A03D_3972_41E0_8C39A26E1110_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_AC7F4CD7_A03D_3972_41E0_8C39A26E1110_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_AC7F4CD7_A03D_3972_41E0_8C39A26E1110_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_AC7F4CD7_A03D_3972_41E0_8C39A26E1110_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_AC7F4CD7_A03D_3972_41E0_8C39A26E1110_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_AC7F4CD7_A03D_3972_41E0_8C39A26E1110_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_976DEE06_9AFB_C333_41CD_161BBA331BF3"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_97FDD82A_9AF8_CF73_41C9_6DC675D1A8AA"
  }
 ],
 "vfov": 180,
 "thumbnailUrl": "media/panorama_AC7F4CD7_A03D_3972_41E0_8C39A26E1110_t.jpg",
 "overlays": [
  "this.overlay_AF27D6FF_A07B_C931_41BD_832010E3E4C8",
  "this.overlay_AFA6AAC8_A07D_D95E_41D8_C0BDB15A89AB"
 ],
 "partial": false
},
{
 "label": "09",
 "id": "panorama_97C88C72_9AF8_C7D2_41DE_14AF882F2CA7",
 "hfov": 360,
 "class": "Panorama",
 "pitch": 0,
 "hfovMin": "150%",
 "hfovMax": 130,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_97C88C72_9AF8_C7D2_41DE_14AF882F2CA7_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_97C88C72_9AF8_C7D2_41DE_14AF882F2CA7_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_97C88C72_9AF8_C7D2_41DE_14AF882F2CA7_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_97C88C72_9AF8_C7D2_41DE_14AF882F2CA7_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_97C88C72_9AF8_C7D2_41DE_14AF882F2CA7_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_97C88C72_9AF8_C7D2_41DE_14AF882F2CA7_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_97C88C72_9AF8_C7D2_41DE_14AF882F2CA7_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_97C88C72_9AF8_C7D2_41DE_14AF882F2CA7_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_97C88C72_9AF8_C7D2_41DE_14AF882F2CA7_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_97C88C72_9AF8_C7D2_41DE_14AF882F2CA7_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_97C88C72_9AF8_C7D2_41DE_14AF882F2CA7_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_97C88C72_9AF8_C7D2_41DE_14AF882F2CA7_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_97C88C72_9AF8_C7D2_41DE_14AF882F2CA7_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_97C88C72_9AF8_C7D2_41DE_14AF882F2CA7_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_97C88C72_9AF8_C7D2_41DE_14AF882F2CA7_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_97C88C72_9AF8_C7D2_41DE_14AF882F2CA7_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_97C88C72_9AF8_C7D2_41DE_14AF882F2CA7_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_97C88C72_9AF8_C7D2_41DE_14AF882F2CA7_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_97C88C72_9AF8_C7D2_41DE_14AF882F2CA7_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_97FF00C0_9AF8_3F2E_41E1_689B7996A1D3"
  }
 ],
 "vfov": 180,
 "thumbnailUrl": "media/panorama_97C88C72_9AF8_C7D2_41DE_14AF882F2CA7_t.jpg",
 "overlays": [
  "this.overlay_CA153A67_9A28_43F1_41D5_2F077AA602C3"
 ],
 "partial": false
},
{
 "label": "12",
 "id": "panorama_949EC2DE_9AF8_C0D2_41D9_CED93B021FE5",
 "hfov": 360,
 "class": "Panorama",
 "pitch": 0,
 "hfovMin": "150%",
 "hfovMax": 130,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_949EC2DE_9AF8_C0D2_41D9_CED93B021FE5_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_949EC2DE_9AF8_C0D2_41D9_CED93B021FE5_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_949EC2DE_9AF8_C0D2_41D9_CED93B021FE5_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_949EC2DE_9AF8_C0D2_41D9_CED93B021FE5_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_949EC2DE_9AF8_C0D2_41D9_CED93B021FE5_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_949EC2DE_9AF8_C0D2_41D9_CED93B021FE5_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_949EC2DE_9AF8_C0D2_41D9_CED93B021FE5_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_949EC2DE_9AF8_C0D2_41D9_CED93B021FE5_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_949EC2DE_9AF8_C0D2_41D9_CED93B021FE5_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_949EC2DE_9AF8_C0D2_41D9_CED93B021FE5_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_949EC2DE_9AF8_C0D2_41D9_CED93B021FE5_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_949EC2DE_9AF8_C0D2_41D9_CED93B021FE5_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_949EC2DE_9AF8_C0D2_41D9_CED93B021FE5_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_949EC2DE_9AF8_C0D2_41D9_CED93B021FE5_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_949EC2DE_9AF8_C0D2_41D9_CED93B021FE5_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_949EC2DE_9AF8_C0D2_41D9_CED93B021FE5_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_949EC2DE_9AF8_C0D2_41D9_CED93B021FE5_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_949EC2DE_9AF8_C0D2_41D9_CED93B021FE5_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_949EC2DE_9AF8_C0D2_41D9_CED93B021FE5_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_9726B933_9AF8_C151_4198_716A8AE76373"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_97FDD82A_9AF8_CF73_41C9_6DC675D1A8AA"
  }
 ],
 "vfov": 180,
 "thumbnailUrl": "media/panorama_949EC2DE_9AF8_C0D2_41D9_CED93B021FE5_t.jpg",
 "overlays": [
  "this.overlay_E5D971C8_9E68_C13F_41D1_64E4C8AD03E0",
  "this.overlay_0CB196BA_9E58_C353_41D9_7DA9BC5086D4"
 ],
 "partial": false
},
{
 "shadow": false,
 "toolTipFontSize": "1.11vmin",
 "toolTipOpacity": 1,
 "id": "MainViewer",
 "left": 0,
 "playbackBarHeight": 10,
 "playbackBarBackgroundColorDirection": "vertical",
 "class": "ViewerArea",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadWidth": 6,
 "toolTipShadowBlurRadius": 3,
 "playbackBarRight": 0,
 "width": "100%",
 "toolTipTextShadowColor": "#000000",
 "toolTipTextShadowBlurRadius": 3,
 "toolTipFontWeight": "normal",
 "playbackBarProgressBorderSize": 0,
 "toolTipPaddingBottom": 4,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "progressBarBorderSize": 0,
 "playbackBarHeadShadowVerticalLength": 0,
 "toolTipShadowColor": "#333333",
 "minHeight": 50,
 "playbackBarBorderRadius": 0,
 "paddingRight": 0,
 "playbackBarHeadBorderRadius": 0,
 "playbackBarProgressBorderColor": "#000000",
 "minWidth": 100,
 "toolTipShadowOpacity": 1,
 "playbackBarHeadShadowHorizontalLength": 0,
 "toolTipFontStyle": "normal",
 "progressLeft": 0,
 "height": "100%",
 "playbackBarHeadBorderColor": "#000000",
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "playbackBarBorderSize": 0,
 "propagateClick": false,
 "toolTipTextShadowOpacity": 0,
 "toolTipFontFamily": "Arial",
 "vrPointerSelectionColor": "#FF6600",
 "playbackBarBackgroundOpacity": 1,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "playbackBarHeadShadowColor": "#000000",
 "toolTipShadowHorizontalLength": 0,
 "vrPointerSelectionTime": 2000,
 "progressRight": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "toolTipShadowVerticalLength": 0,
 "progressBarBackgroundColorDirection": "vertical",
 "progressBottom": 0,
 "progressHeight": 10,
 "playbackBarHeadShadow": true,
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#606060",
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarOpacity": 1,
 "borderSize": 0,
 "vrPointerColor": "#FFFFFF",
 "progressBarOpacity": 1,
 "playbackBarBorderColor": "#FFFFFF",
 "progressBorderSize": 0,
 "playbackBarHeadShadowOpacity": 0.7,
 "transitionMode": "blending",
 "paddingLeft": 0,
 "displayTooltipInTouchScreens": true,
 "top": 0,
 "toolTipPaddingTop": 4,
 "toolTipBorderSize": 1,
 "toolTipPaddingLeft": 6,
 "progressBorderRadius": 0,
 "transitionDuration": 500,
 "toolTipPaddingRight": 6,
 "toolTipDisplayTime": 600,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "playbackBarLeft": 0,
 "progressBackgroundColorRatios": [
  0
 ],
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "playbackBarHeadHeight": 15,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "progressBarBorderColor": "#000000",
 "paddingTop": 0,
 "progressBarBackgroundColorRatios": [
  0
 ],
 "progressBackgroundColorDirection": "vertical",
 "playbackBarHeadOpacity": 1,
 "paddingBottom": 0,
 "playbackBarBottom": 5,
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "toolTipShadowSpread": 0,
 "progressBorderColor": "#000000",
 "toolTipBorderColor": "#767676",
 "data": {
  "name": "Main Viewer"
 },
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "progressBackgroundColor": [
  "#FFFFFF"
 ]
},
{
 "maxWidth": 824,
 "id": "IconButton_493E7194_5F5A_32C7_41D0_1B02FAF70A98",
 "maxHeight": 556,
 "width": 128.01,
 "class": "IconButton",
 "right": "4.08%",
 "horizontalAlign": "center",
 "borderSize": 0,
 "minHeight": 1,
 "paddingLeft": 0,
 "verticalAlign": "middle",
 "paddingRight": 0,
 "mode": "push",
 "height": 158.03,
 "backgroundOpacity": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "bottom": "1.79%",
 "transparencyActive": false,
 "click": "this.openLink('https://www.facebook.com/share/p/19sRPLFPHT/', '_blank')",
 "iconURL": "skin/IconButton_493E7194_5F5A_32C7_41D0_1B02FAF70A98.png",
 "paddingTop": 0,
 "propagateClick": false,
 "paddingBottom": 0,
 "data": {
  "name": "IconButton10142"
 },
 "shadow": false,
 "cursor": "hand"
},
{
 "maxWidth": 427,
 "id": "Image_278E0513_9E68_4151_418F_E5411D76D16C",
 "maxHeight": 128,
 "horizontalAlign": "center",
 "class": "Image",
 "right": "18.48%",
 "width": "16.487%",
 "url": "skin/Image_278E0513_9E68_4151_418F_E5411D76D16C.png",
 "borderSize": 0,
 "minHeight": 1,
 "paddingLeft": 0,
 "paddingRight": 0,
 "verticalAlign": "middle",
 "height": "20.718%",
 "backgroundOpacity": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "bottom": "0.16%",
 "click": "this.openLink('https://www.facebook.com/benylanderos27', '_blank')",
 "paddingTop": 0,
 "propagateClick": false,
 "paddingBottom": 0,
 "scaleMode": "fit_inside",
 "data": {
  "name": "Image71579"
 },
 "shadow": false,
 "cursor": "hand"
},
{
 "maxWidth": 772,
 "id": "Image_B22B414C_A045_4B57_41DB_29D035DF914A",
 "left": "3.71%",
 "maxHeight": 336,
 "horizontalAlign": "center",
 "class": "Image",
 "width": "21.286%",
 "url": "skin/Image_B22B414C_A045_4B57_41DB_29D035DF914A.png",
 "borderSize": 0,
 "minHeight": 1,
 "paddingLeft": 0,
 "paddingRight": 0,
 "verticalAlign": "middle",
 "height": "26.754%",
 "backgroundOpacity": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "bottom": "0%",
 "click": "this.openLink('https://www.facebook.com/profile.php?id=61579580304249', '_blank')",
 "paddingTop": 0,
 "propagateClick": false,
 "paddingBottom": 0,
 "scaleMode": "fit_inside",
 "data": {
  "name": "Image11397"
 },
 "shadow": false,
 "cursor": "hand"
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 4)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 02 Left-Up"
 },
 "maps": [
  {
   "hfov": 12.22,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 45.67,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_973F645F_9AF8_47D2_41E0_B0897350E0C8_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -5.84
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 12.22,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_B003DE88_9A28_C33E_41E2_FF0871F8CF99",
   "pitch": -5.84,
   "yaw": 45.67,
   "distance": 50
  }
 ],
 "id": "overlay_B62E0792_9A58_4153_4160_5AD338B0BE3E",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_976DEE06_9AFB_C333_41CD_161BBA331BF3, this.camera_B309FAED_A4BF_CC1C_41B8_88EC64689BCE); this.mainPlayList.set('selectedIndex', 2)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Point 03c"
 },
 "maps": [
  {
   "hfov": 15.95,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -0.55,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_973F645F_9AF8_47D2_41E0_B0897350E0C8_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 49,
      "height": 16
     }
    ]
   },
   "pitch": -41.88
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 15.95,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_1C079BF7_9E58_C0D1_41C9_6BF02263AAAC",
   "pitch": -41.88,
   "yaw": -0.55,
   "distance": 100
  }
 ],
 "id": "overlay_FB7BCD23_9E28_4171_41D3_60E7AE36D880",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 2)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Door 02"
 },
 "maps": [
  {
   "hfov": 12.27,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 1.6,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_948E6B0A_9AFB_C133_41DC_F671C97DAA71_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 5.69
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 12.27,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_8E5EA966_9EFB_6487_41D2_6C2BB10A8633",
   "pitch": 5.69,
   "yaw": 1.6,
   "distance": 100
  }
 ],
 "id": "overlay_82726B65_9A38_C1F1_41CF_B497229303FB",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_91FB4A68_9A28_C3FF_41D0_DA40E82F270F, this.camera_B3B7A985_A4BF_CC0F_41E1_2C6289214F24); this.mainPlayList.set('selectedIndex', 0)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Door 02"
 },
 "maps": [
  {
   "hfov": 13.13,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -170.68,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_948E6B0A_9AFB_C133_41DC_F671C97DAA71_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 2.65
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 13.13,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_8E5EC966_9EFB_6487_41E2_B7A68A9442D0",
   "pitch": 2.65,
   "yaw": -170.68,
   "distance": 100
  }
 ],
 "id": "overlay_11A5FC07_9E38_4731_41D0_E5585982ED57",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_9726B933_9AF8_C151_4198_716A8AE76373, this.camera_B3BE69A5_A4BF_CC0C_41E2_4E96071A3A26); this.mainPlayList.set('selectedIndex', 12)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Point 01"
 },
 "maps": [
  {
   "hfov": 14.12,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -69.39,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_948E6B0A_9AFB_C133_41DC_F671C97DAA71_0_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 1.13
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 14.12,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_3C24E971_9E2B_C1D1_41E3_950D05DCC76F",
   "pitch": 1.13,
   "yaw": -69.39,
   "distance": 100
  }
 ],
 "id": "overlay_37A429A5_9E28_4171_41CC_6D0EBB45DE79",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_974B7AA7_9AF8_4371_41CB_FA8F4BF6737D, this.camera_B3DCAABE_A4BF_CC7C_41D9_8046EFC62061); this.mainPlayList.set('selectedIndex', 5)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Door 02"
 },
 "maps": [
  {
   "hfov": 14.4,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -152.73,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_949325FC_9AF8_40D7_41BE_02E2561CD0FF_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -1.16
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 14.4,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_CB8AFEA8_9DE9_C37F_41C5_F075576A62F9",
   "pitch": -1.16,
   "yaw": -152.73,
   "distance": 100
  }
 ],
 "id": "overlay_CE92518C_9DEB_C137_41CA_5A69BFB05CD9",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_949325FC_9AF8_40D7_41BE_02E2561CD0FF, this.camera_B3F04A50_A4BF_CC05_41E2_E68EDB8F2E83); this.mainPlayList.set('selectedIndex', 6)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Door 02"
 },
 "maps": [
  {
   "hfov": 14.38,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 138.47,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_974B7AA7_9AF8_4371_41CB_FA8F4BF6737D_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 3.34
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 14.38,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_A2C5B47F_9BE8_C7D1_41B2_F2C4644943D8",
   "pitch": 3.34,
   "yaw": 138.47,
   "distance": 100
  }
 ],
 "id": "overlay_AE21B35D_9BE9_C1D1_41A3_4407D2447994",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_9756801D_9AF8_7F51_41D5_4F35EEFD08D7, this.camera_B3E6DA22_A4BF_CC04_41CB_B271ABC805A7); this.mainPlayList.set('selectedIndex', 4)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Door 02"
 },
 "maps": [
  {
   "hfov": 14.4,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -171.16,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_974B7AA7_9AF8_4371_41CB_FA8F4BF6737D_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -1.16
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 14.4,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_A2C4647F_9BE8_C7D1_41D7_251BDF6C1A1F",
   "pitch": -1.16,
   "yaw": -171.16,
   "distance": 100
  }
 ],
 "id": "overlay_A306F95F_9BE8_41D2_41CD_A54D760A4157",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 5)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Door 02"
 },
 "maps": [
  {
   "hfov": 16.45,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -83.72,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9756801D_9AF8_7F51_41D5_4F35EEFD08D7_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 1.5
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 16.45,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_8E50F966_9EFB_6487_41DF_FCE8855E2373",
   "pitch": 1.5,
   "yaw": -83.72,
   "distance": 100
  }
 ],
 "id": "overlay_B508C3CA_9BEB_C132_41D3_27C0793DFD0E",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 7)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Door 02"
 },
 "maps": [
  {
   "hfov": 18.49,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 0.83,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9756801D_9AF8_7F51_41D5_4F35EEFD08D7_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 1.91
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 18.49,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_8E501966_9EFB_6487_41BE_602EC6207B1C",
   "pitch": 1.91,
   "yaw": 0.83,
   "distance": 100
  }
 ],
 "id": "overlay_B431B761_9BF8_C1F1_41AE_792FD15F56CE",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_973F645F_9AF8_47D2_41E0_B0897350E0C8, this.camera_BCA3FB6A_A4BF_CC04_41D3_540652C769D2); this.mainPlayList.set('selectedIndex', 3)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Point 03c"
 },
 "maps": [
  {
   "hfov": 11.55,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -178.09,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9756801D_9AF8_7F51_41D5_4F35EEFD08D7_0_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 49,
      "height": 16
     }
    ]
   },
   "pitch": -36.96
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 11.55,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_8E03C559_9F0D_6C8A_41E2_7264DC08B894",
   "pitch": -36.96,
   "yaw": -178.09,
   "distance": 100
  }
 ],
 "id": "overlay_FBC9409E_9DE8_7F53_41E2_E790EF9DB745",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 3)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Arrow 01a"
 },
 "maps": [
  {
   "hfov": 34.19,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -46.76,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_976DEE06_9AFB_C333_41CD_161BBA331BF3_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 26,
      "height": 16
     }
    ]
   },
   "pitch": -19.67
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 34.19,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_B05E6235_9A58_C351_41C5_445838DB08AD",
   "pitch": -19.67,
   "yaw": -46.76,
   "distance": 100
  }
 ],
 "id": "overlay_B3322B39_9A79_C151_41D2_52112B015488",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_AC7F4CD7_A03D_3972_41E0_8C39A26E1110, this.camera_B365AB1C_A4BF_CC3C_41C9_E1C8F03CF038); this.mainPlayList.set('selectedIndex', 9)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 02c Right"
 },
 "maps": [
  {
   "hfov": 17.54,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 143.14,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_976DEE06_9AFB_C333_41CD_161BBA331BF3_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 26,
      "height": 16
     }
    ]
   },
   "pitch": -21.4
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 17.54,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_B0E14B1D_A047_D8F1_41E1_6E0972042A59",
   "pitch": -21.4,
   "yaw": 143.14,
   "distance": 50
  }
 ],
 "id": "overlay_F29CFC5C_9E58_47D6_41D4_85DAD2BC7493",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_948E6B0A_9AFB_C133_41DC_F671C97DAA71, this.camera_B314FB0C_A4BF_CC1D_419A_B75ED70F3F5A); this.mainPlayList.set('selectedIndex', 1)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Door 02"
 },
 "maps": [
  {
   "hfov": 7.11,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 47.31,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_976DEE06_9AFB_C333_41CD_161BBA331BF3_0_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -0.12
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 7.11,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_8E5FC966_9EFB_6487_41DA_EDE8CE846E27",
   "pitch": -0.12,
   "yaw": 47.31,
   "distance": 100
  }
 ],
 "id": "overlay_0F4EFC95_9E38_4751_41D0_F7FFEF5326AD",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 1)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Door 01"
 },
 "maps": [
  {
   "hfov": 8.06,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 1.62,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_91FB4A68_9A28_C3FF_41D0_DA40E82F270F_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 3.11
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 8.06,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_8E5DA966_9EFB_6487_4199_933AC2EE0244",
   "pitch": 3.11,
   "yaw": 1.62,
   "distance": 100
  }
 ],
 "id": "overlay_82D45E2E_9A38_4373_41DA_DCB0EE38687B",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_9726B933_9AF8_C151_4198_716A8AE76373, this.camera_B38A49C4_A4BF_CC0C_41CD_7A983ADFBC7D); this.mainPlayList.set('selectedIndex', 12)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Door 01"
 },
 "maps": [
  {
   "hfov": 6.63,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -51.28,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_91FB4A68_9A28_C3FF_41D0_DA40E82F270F_0_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 3.25
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 6.63,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_8E5D7966_9EFB_6487_41E1_83B88DA34C99",
   "pitch": 3.25,
   "yaw": -51.28,
   "distance": 100
  }
 ],
 "id": "overlay_39157C50_9E28_472F_41D8_6F81604DD637",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_949EC2DE_9AF8_C0D2_41D9_CED93B021FE5, this.camera_B32E4ACD_A4BF_CC1F_41D8_653EE949CE38); this.mainPlayList.set('selectedIndex', 11)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Point 01"
 },
 "maps": [
  {
   "hfov": 15.36,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 2.87,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_97FDD82A_9AF8_CF73_41C9_6DC675D1A8AA_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -0.11
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 15.36,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_136E904E_9E78_DF32_41D9_93CBAEF98DF8",
   "pitch": -0.11,
   "yaw": 2.87,
   "distance": 100
  }
 ],
 "id": "overlay_1E831F0E_9E78_C133_41E3_5A49A3467F96",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_AC7F4CD7_A03D_3972_41E0_8C39A26E1110, this.camera_B3386ADD_A4BF_CC3F_41D6_9996BD90377A); this.mainPlayList.set('selectedIndex', 9)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Door 01"
 },
 "maps": [
  {
   "hfov": 7.92,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -100,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_97FDD82A_9AF8_CF73_41C9_6DC675D1A8AA_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 2.57
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 7.92,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_10D4F16A_9E28_C1F3_41B0_81122C732F95",
   "pitch": 2.57,
   "yaw": -100,
   "distance": 100
  }
 ],
 "id": "overlay_1AC88FA8_9E28_C17F_41C3_415EE4074754",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 11)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Point 01"
 },
 "maps": [
  {
   "hfov": 13.33,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -5.71,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9726B933_9AF8_C151_4198_716A8AE76373_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 0.8
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 13.33,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_176FFC30_9E28_C76E_41DA_05154CB282B9",
   "pitch": 0.8,
   "yaw": -5.71,
   "distance": 100
  }
 ],
 "id": "overlay_147F82CE_9E68_4333_41DB_F060E05EE236",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_948E6B0A_9AFB_C133_41DC_F671C97DAA71, this.camera_B39489F3_A4BF_CC04_41CF_A10AD83611A6); this.mainPlayList.set('selectedIndex', 1)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Generic 04"
 },
 "maps": [
  {
   "hfov": 13.19,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 111.02,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9726B933_9AF8_C151_4198_716A8AE76373_0_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -0.62
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 13.19,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_B1CE789E_A045_59F2_41C9_B4F875329C7C",
   "pitch": -0.62,
   "yaw": 111.02,
   "distance": 100
  }
 ],
 "id": "overlay_B08E86F4_A05D_C937_41D3_71704E859301",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 8)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Door 02"
 },
 "maps": [
  {
   "hfov": 12.36,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -50.54,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_97FF00C0_9AF8_3F2E_41E1_689B7996A1D3_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 0.07
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 12.36,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_A2C4047F_9BE8_C7D1_41D4_E069E5FA14C5",
   "pitch": 0.07,
   "yaw": -50.54,
   "distance": 100
  }
 ],
 "id": "overlay_AE3067F3_9BF8_40D1_41D8_5705C1553344",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_9756801D_9AF8_7F51_41D5_4F35EEFD08D7, this.camera_B3773B2B_A4BF_CC1B_4194_E2ADA7A6AC5F); this.mainPlayList.set('selectedIndex', 4)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Door 02"
 },
 "maps": [
  {
   "hfov": 13.57,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -139.21,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_97FF00C0_9AF8_3F2E_41E1_689B7996A1D3_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -2.39
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 13.57,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_A2C4B47F_9BE8_C7D1_41C9_49D01AF42125",
   "pitch": -2.39,
   "yaw": -139.21,
   "distance": 100
  }
 ],
 "id": "overlay_AEE1B560_9BE8_C1EF_41C8_210B999FB595",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 10)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Door 02"
 },
 "maps": [
  {
   "hfov": 7.64,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 7.34,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_AC7F4CD7_A03D_3972_41E0_8C39A26E1110_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 0.49
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 7.64,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_B03B4441_A04C_C951_41C4_3BF858BC6D0D",
   "pitch": 0.49,
   "yaw": 7.34,
   "distance": 100
  }
 ],
 "id": "overlay_AF27D6FF_A07B_C931_41BD_832010E3E4C8",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_976DEE06_9AFB_C333_41CD_161BBA331BF3, this.camera_B3D31A9F_A4BF_CC3C_41DA_FEA42C1015D1); this.mainPlayList.set('selectedIndex', 2)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Point 01"
 },
 "maps": [
  {
   "hfov": 23.91,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 123.12,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_AC7F4CD7_A03D_3972_41E0_8C39A26E1110_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -4.89
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 23.91,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AFD7B6AB_A07B_49D2_41C1_1F4A8A6455F7",
   "pitch": -4.89,
   "yaw": 123.12,
   "distance": 100
  }
 ],
 "id": "overlay_AFA6AAC8_A07D_D95E_41D8_C0BDB15A89AB",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_97FF00C0_9AF8_3F2E_41E1_689B7996A1D3, this.camera_B3C27A7F_A4BF_CCFB_41C7_CC10DADE039E); this.mainPlayList.set('selectedIndex', 7)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Door 02"
 },
 "maps": [
  {
   "hfov": 14.39,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -151.91,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_97C88C72_9AF8_C7D2_41DE_14AF882F2CA7_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 2.93
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 14.39,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_D30A1240_9A27_C32F_41E1_E51E3E61058D",
   "pitch": 2.93,
   "yaw": -151.91,
   "distance": 100
  }
 ],
 "id": "overlay_CA153A67_9A28_43F1_41D5_2F077AA602C3",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_9726B933_9AF8_C151_4198_716A8AE76373, this.camera_B340BB4A_A4BF_CC05_41E1_677D21CBAA4A); this.mainPlayList.set('selectedIndex', 12)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Point 01"
 },
 "maps": [
  {
   "hfov": 13.47,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 71.8,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_949EC2DE_9AF8_C0D2_41D9_CED93B021FE5_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -2.44
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 13.47,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_E37A2B27_9E68_C171_41D8_56F7CF44967E",
   "pitch": -2.44,
   "yaw": 71.8,
   "distance": 100
  }
 ],
 "id": "overlay_E5D971C8_9E68_C13F_41D1_64E4C8AD03E0",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_97FDD82A_9AF8_CF73_41C9_6DC675D1A8AA, this.camera_B3521B5A_A4BF_CC05_419D_047C73EFAC84); this.mainPlayList.set('selectedIndex', 10)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Point 01"
 },
 "maps": [
  {
   "hfov": 14.24,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 0.65,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_949EC2DE_9AF8_C0D2_41D9_CED93B021FE5_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 0.66
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 14.24,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_3D17385C_9E39_CFD7_41AA_8AEB4496FC85",
   "pitch": 0.66,
   "yaw": 0.65,
   "distance": 100
  }
 ],
 "id": "overlay_0CB196BA_9E58_C353_41D9_7DA9BC5086D4",
 "enabledInCardboard": true
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_B003DE88_9A28_C33E_41E2_FF0871F8CF99",
 "levels": [
  {
   "url": "media/panorama_973F645F_9AF8_47D2_41E0_B0897350E0C8_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 380,
   "height": 570
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_1C079BF7_9E58_C0D1_41C9_6BF02263AAAC",
 "levels": [
  {
   "url": "media/panorama_973F645F_9AF8_47D2_41E0_B0897350E0C8_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 800,
   "height": 390
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_8E5EA966_9EFB_6487_41D2_6C2BB10A8633",
 "levels": [
  {
   "url": "media/panorama_948E6B0A_9AFB_C133_41DC_F671C97DAA71_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 800,
   "height": 1200
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_8E5EC966_9EFB_6487_41E2_B7A68A9442D0",
 "levels": [
  {
   "url": "media/panorama_948E6B0A_9AFB_C133_41DC_F671C97DAA71_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 800,
   "height": 1200
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_3C24E971_9E2B_C1D1_41E3_950D05DCC76F",
 "levels": [
  {
   "url": "media/panorama_948E6B0A_9AFB_C133_41DC_F671C97DAA71_0_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 1200,
   "height": 1800
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_CB8AFEA8_9DE9_C37F_41C5_F075576A62F9",
 "levels": [
  {
   "url": "media/panorama_949325FC_9AF8_40D7_41BE_02E2561CD0FF_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 800,
   "height": 1200
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_A2C5B47F_9BE8_C7D1_41B2_F2C4644943D8",
 "levels": [
  {
   "url": "media/panorama_974B7AA7_9AF8_4371_41CB_FA8F4BF6737D_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 800,
   "height": 1200
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_A2C4647F_9BE8_C7D1_41D7_251BDF6C1A1F",
 "levels": [
  {
   "url": "media/panorama_974B7AA7_9AF8_4371_41CB_FA8F4BF6737D_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 800,
   "height": 1200
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_8E50F966_9EFB_6487_41DF_FCE8855E2373",
 "levels": [
  {
   "url": "media/panorama_9756801D_9AF8_7F51_41D5_4F35EEFD08D7_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 800,
   "height": 1200
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_8E501966_9EFB_6487_41BE_602EC6207B1C",
 "levels": [
  {
   "url": "media/panorama_9756801D_9AF8_7F51_41D5_4F35EEFD08D7_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 800,
   "height": 1200
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_8E03C559_9F0D_6C8A_41E2_7264DC08B894",
 "levels": [
  {
   "url": "media/panorama_9756801D_9AF8_7F51_41D5_4F35EEFD08D7_0_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 800,
   "height": 390
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_B05E6235_9A58_C351_41C5_445838DB08AD",
 "levels": [
  {
   "url": "media/panorama_976DEE06_9AFB_C333_41CD_161BBA331BF3_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1220,
   "height": 1110
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_B0E14B1D_A047_D8F1_41E1_6E0972042A59",
 "levels": [
  {
   "url": "media/panorama_976DEE06_9AFB_C333_41CD_161BBA331BF3_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 400,
   "height": 360
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_8E5FC966_9EFB_6487_41DA_EDE8CE846E27",
 "levels": [
  {
   "url": "media/panorama_976DEE06_9AFB_C333_41CD_161BBA331BF3_0_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 800,
   "height": 1200
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_8E5DA966_9EFB_6487_4199_933AC2EE0244",
 "levels": [
  {
   "url": "media/panorama_91FB4A68_9A28_C3FF_41D0_DA40E82F270F_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 800,
   "height": 1200
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_8E5D7966_9EFB_6487_41E1_83B88DA34C99",
 "levels": [
  {
   "url": "media/panorama_91FB4A68_9A28_C3FF_41D0_DA40E82F270F_0_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 800,
   "height": 1200
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_136E904E_9E78_DF32_41D9_93CBAEF98DF8",
 "levels": [
  {
   "url": "media/panorama_97FDD82A_9AF8_CF73_41C9_6DC675D1A8AA_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1200,
   "height": 1800
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_10D4F16A_9E28_C1F3_41B0_81122C732F95",
 "levels": [
  {
   "url": "media/panorama_97FDD82A_9AF8_CF73_41C9_6DC675D1A8AA_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 800,
   "height": 1200
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_176FFC30_9E28_C76E_41DA_05154CB282B9",
 "levels": [
  {
   "url": "media/panorama_9726B933_9AF8_C151_4198_716A8AE76373_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1200,
   "height": 1800
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_B1CE789E_A045_59F2_41C9_B4F875329C7C",
 "levels": [
  {
   "url": "media/panorama_9726B933_9AF8_C151_4198_716A8AE76373_0_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 800,
   "height": 1200
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_A2C4047F_9BE8_C7D1_41D4_E069E5FA14C5",
 "levels": [
  {
   "url": "media/panorama_97FF00C0_9AF8_3F2E_41E1_689B7996A1D3_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 800,
   "height": 1200
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_A2C4B47F_9BE8_C7D1_41C9_49D01AF42125",
 "levels": [
  {
   "url": "media/panorama_97FF00C0_9AF8_3F2E_41E1_689B7996A1D3_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 800,
   "height": 1200
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_B03B4441_A04C_C951_41C4_3BF858BC6D0D",
 "levels": [
  {
   "url": "media/panorama_AC7F4CD7_A03D_3972_41E0_8C39A26E1110_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 800,
   "height": 1200
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_AFD7B6AB_A07B_49D2_41C1_1F4A8A6455F7",
 "levels": [
  {
   "url": "media/panorama_AC7F4CD7_A03D_3972_41E0_8C39A26E1110_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 1200,
   "height": 1800
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_D30A1240_9A27_C32F_41E1_E51E3E61058D",
 "levels": [
  {
   "url": "media/panorama_97C88C72_9AF8_C7D2_41DE_14AF882F2CA7_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 800,
   "height": 1200
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_E37A2B27_9E68_C171_41D8_56F7CF44967E",
 "levels": [
  {
   "url": "media/panorama_949EC2DE_9AF8_C0D2_41D9_CED93B021FE5_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1200,
   "height": 1800
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_3D17385C_9E39_CFD7_41AA_8AEB4496FC85",
 "levels": [
  {
   "url": "media/panorama_949EC2DE_9AF8_C0D2_41D9_CED93B021FE5_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 1200,
   "height": 1800
  }
 ],
 "frameCount": 24
}],
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "propagateClick": false,
 "mouseWheelEnabled": true,
 "backgroundPreloadEnabled": true,
 "paddingBottom": 0,
 "desktopMipmappingEnabled": false,
 "data": {
  "name": "Player445"
 },
 "gap": 10,
 "height": "100%",
 "scrollBarOpacity": 0.5,
 "shadow": false,
 "mobileMipmappingEnabled": false,
 "scrollBarVisible": "rollOver",
 "overflow": "visible",
 "vrPolyfillScale": 0.5
};

    
    function HistoryData(playList) {
        this.playList = playList;
        this.list = [];
        this.pointer = -1;
    }

    HistoryData.prototype.add = function(index){
        if(this.pointer < this.list.length && this.list[this.pointer] == index) {
            return;
        }
        ++this.pointer;
        this.list.splice(this.pointer, this.list.length - this.pointer, index);
    };

    HistoryData.prototype.back = function(){
        if(!this.canBack()) return;
        this.playList.set('selectedIndex', this.list[--this.pointer]);
    };

    HistoryData.prototype.forward = function(){
        if(!this.canForward()) return;
        this.playList.set('selectedIndex', this.list[++this.pointer]);
    };

    HistoryData.prototype.canBack = function(){
        return this.pointer > 0;
    };

    HistoryData.prototype.canForward = function(){
        return this.pointer >= 0 && this.pointer < this.list.length-1;
    };
    //

    if(script.data == undefined)
        script.data = {};
    script.data["history"] = {};    //playListID -> HistoryData

    TDV.PlayerAPI.defineScript(script);
})();
