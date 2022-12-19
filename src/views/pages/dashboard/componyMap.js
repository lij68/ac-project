import React, {useCallback, useEffect, useRef} from "react";

function ComponyMap() {
	const mapRef = useRef(null);
	const coordinate = {lat: 35.159800, lng: 128.1062000}
	const content =
		'<div id="content">' +
		'<div id="siteNotice">' +
		"</div>" +
		'<h1 id="firstHeading" class="firstHeading">서울IT학원</h1>' +
		'<div id="bodyContent">' +
		'<p><b>주소</b> : 경상남도 진주시 가좌동 가좌길74번길 8 KR 혜람빌딩 5층</p>' +
		'<p><b>영업 시간</b> : 평일 오전 9:00 ~ 오후 10:00, 토요일 오전 9:00 ~ 오후 1:00</p>' +
		'<p><b>보건 및 안전</b> : 예약 필수 · 마스크 필수 · 체온 확인 필수 · 직원 마스크 착용함 · 직원 체온 확인함 </p>' +
		'<p><b>연락처</B> : 055-753-3677</p>' +
		"</div>" +
		"</div>";

	const loadScript = useCallback((url) => {
		const firstScript = window.document.getElementsByTagName('script')[0];
		const newScript = window.document.createElement('script');
		newScript.src = url;
		newScript.async = true;
		newScript.defer = true;
		firstScript?.parentNode?.insertBefore(newScript, firstScript);
	}, []);

	const initMap = useCallback(() => {
		const {google} = window;
		const map = new google.maps.Map(mapRef.current, {
			center: coordinate,
			zoom: 20
		});
		const marker = new google.maps.Marker({
			position: coordinate,
			map,
			title: '서울IT학원'
		})
		const infowindow = new google.maps.InfoWindow({
			content: content
		});
		marker.addListener("click", () => {
			infowindow.open({
				anchor: marker,
				map,
				shouldFocus: false,
			});
		});
	}, []);

	useEffect(() => {
		const script = window.document.getElementsByTagName('script')[0];
		const includeCheck = script.src.startsWith('https://maps.googleapis.com/maps/api');
		if (includeCheck) return initMap();

		window.initMap = initMap;
		loadScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyD2qc9GhAr6mVbHsIi7X-yqD35EcG8fzCA&callback=initMap');
	}, [initMap]);

	return (
		<div
			className="map"
			style={{width: "100%", height: "88%"}}
			ref={mapRef}
		></div>
	);
}

export default ComponyMap;