(function () {
  var height = window.innerHeight;
  var width = window.innerWidth;

  var container;
  var camera, scene, renderer;

  init();
  animate();

  function init() {
    container = document.createElement('div');
    document.body.appendChild(container);

    camera = new THREE.PerspectiveCamera(175, width / height, 1, 500);
    scene = new THREE.Scene();

    scene.fog = new THREE.FogExp2('#111', 0.0085);

    var size = 1500, step = 5;
    var geometry = new THREE.Geometry();

    for (var i =- size; i <= size; i += step) {
      geometry.vertices.push( new THREE.Vector3(-size, 10, i));
      geometry.vertices.push( new THREE.Vector3(size, 10, i));
    }

    var material = new THREE.LineBasicMaterial({
      color: '#3273ff',
      opacity: 0.4
    });

    var line = new THREE.LineSegments(geometry, material);
    scene.add(line);

    var geometry2 = new THREE.Geometry();

    for (var i =- size; i <= size; i += step + 15) {
      geometry2.vertices.push( new THREE.Vector3(i, 260, - size));
      geometry2.vertices.push( new THREE.Vector3(i, 260,   size));
    }

    var material2 = new THREE.LineBasicMaterial({
      color: '#3273ff',
      opacity: 0.1
    });

    var line2 = new THREE.LineSegments(geometry2, material2);
    scene.add(line2);

    var geometry3 = new THREE.Geometry();

    for (var i =- size; i <= size; i += step + 15) {
      geometry3.vertices.push( new THREE.Vector3(i, 1260, -size));
      geometry3.vertices.push( new THREE.Vector3(i, 1260,   size));
    }

    var material3 = new THREE.LineBasicMaterial({
      color: '#111',
      opacity: 0.4
    });

    var line3 = new THREE.LineSegments(geometry3, material3);
    scene.add(line3);

    var geometry4 = new THREE.Geometry();

    for (var i =- size; i <= size; i += step) {
      geometry4.vertices.push( new THREE.Vector3(-size, 1530, i));
      geometry4.vertices.push( new THREE.Vector3(size, 1530, i));
    }

    var material4 = new THREE.LineBasicMaterial({
      color: '#6262ff',
      opacity: 0.1
    });

    var line4 = new THREE.LineSegments(geometry4, material4);
    scene.add(line4);

    var geometry5 = new THREE.Geometry();

    for (var i =- size; i <= size; i += step) {
      geometry5.vertices.push(new THREE.Vector3(1980, size, i));
      geometry5.vertices.push(new THREE.Vector3(-2780, -size, i));
    }

    var material5 = new THREE.LineBasicMaterial({
      color: '#444',
      opacity: 0.8
    });

    var line5 = new THREE.LineSegments(geometry5, material5);
    scene.add(line5);

    var geometry6 = new THREE.Geometry();

    for (var i =- size; i <= size; i += step) {
      geometry6.vertices.push(new THREE.Vector3(-1930, size, i));
      geometry6.vertices.push(new THREE.Vector3(2780, -size, i));
    }

    var material6 = new THREE.LineBasicMaterial({
      color: '#444',
      opacity: 0.8
    });

    var line6 = new THREE.LineSegments(geometry6, material6);
    scene.add(line6);

    renderer = new THREE.WebGLRenderer({
      alpha: true
    });

    renderer.setClearColor('#fff', 0);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    // postprocessing
    var params = {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      format: THREE.RGBAFormat,
      stencilBuffer: false
    };

    var renderTarget = new THREE.WebGLRenderTarget(width, height, params);

    window.addEventListener('resize', onWindowResize, false);
  }

  function onWindowResize() {
    camera.left = window.innerWidth / -2;
    camera.right = window.innerWidth / 2;
    camera.top = window.innerHeight / 2;
    camera.bottom = window.innerHeight / - 2;

    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );
  }

  function animate() {
    setTimeout(function () {
      requestAnimationFrame(animate);
    }, 100);

    render();
  }

  function render() {
    var timer = Date.now() * 0.00001;
    camera.position.x = 0;
    camera.position.y = 500;
    camera.position.z = Math.cos(timer) * 1000;
    renderer.render(scene, camera);
  }

  var links = document.querySelectorAll('section.menu a');

  function unlink() {
    for (var i = 0; i < links.length; i++) {
      links[i].classList.remove('selected');
      console.log(links[i].getAttribute('data-id'))
      document.querySelector('#' + links[i].getAttribute('data-id')).classList.remove('selected');
    }
  }

  for (var i = 0; i < links.length; i++) {
    links[i].onclick = function (ev) {
      ev.preventDefault();
      unlink();
      this.classList.add('selected');
      document.querySelector('#' + this.getAttribute('data-id')).classList.add('selected');
    };
  }

  links[0].click();
})();
