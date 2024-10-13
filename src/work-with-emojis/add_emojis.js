function createParticle() {

  if (window.location.pathname === '/' && document.getElementById('canvas') === null) {
    const canvas = document.createElement('canvas');
    canvas.id = 'canvas';
    document.body.appendChild(canvas); // Добавляем canvas в body (или другой контейнер)

    const ctx = canvas.getContext('2d');

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const particles = [];
    const numParticles = 60;
    const mouse = { x: 0, y: 0, isMoving: false };

    window.addEventListener('mousemove', (event) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
      mouse.isMoving = true;
    });

    window.addEventListener('mouseout', () => {
      mouse.isMoving = false;
    });

    window.addEventListener('touchmove', (event) => {
      //event.preventDefault();
      mouse.x = event.touches[0].clientX;
      mouse.y = event.touches[0].clientY;
      mouse.isMoving = true;
    });

    window.addEventListener('touchend', () => {
      mouse.isMoving = false;
    });

    const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min)) + min;

    const str1 = '😀😁😂🤣😃😄😅😆😇😈😉😊😋😎😍😘😗😙😚🙂🤗🤩🤔🤨😐😑😶🙄😏😣😥😮😯😪😫😴🥱😌😛😜😝🤐😒😓😔😕🙃🤑😲😳😵😱🥵🥶😰😮😦😧😨😩😢😥🤤😪😓😵😿😾🙀😼😹😻😏😈👹👺💩👻👽🎃';

    const str2 = '🌍🌏🌐🌑🌒🌓🌔🌕🌖🌗🌘🌙🌚🌛🌜🌝🌞🌟🌠🌭🌮🌯🌰🌱🌲🌳🌴🌵🌷🌸🌹🌺🌻🌼'



    const emojis = [...str1 + str2];

    const getRandomEmoji = () => emojis[getRandomInt(0, emojis.length)];

    const generateRandomEmojis = (count) => Array.from({ length: count }, getRandomEmoji);

    const words = generateRandomEmojis(20);

    class Particle {
      constructor(x, y, size, text) {
        this.x = x;
        this.y = y;
        this.size = size;

        this.baseX = x;
        this.baseY = y;
        this.density = Math.random() * 30 + 1;
        this.velocityX = (Math.random() - 0.5) * 3;
        this.velocityY = (Math.random() - 0.5) * 3;
        this.text = text;
        this.angle = 0;
        this.angularSpeed = (Math.random() - 0.5) * 0.1;
        this.targetAngularSpeed = this.angularSpeed; // Добавляем целевую угловую скорость
      }
      draw() {

        ctx.font = `${this.size}px Arial`;
        ctx.textAlign = 'center';
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.fillText(this.text, 0, 0);
        ctx.rotate(-this.angle);
        ctx.translate(-this.x, -this.y);
      }
      update() {
        if (mouse.isMoving) {
          let dx = mouse.x - this.x;
          let dy = mouse.y - this.y;
          let distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 100) {
            let force = (100 - distance) / 100;
            this.x -= dx / distance * force * this.density;
            this.y -= dy / distance * force * this.density;
          }
        }

        this.x += this.velocityX;
        this.y += this.velocityY;
        if (this.x + this.size > width || this.x - this.size < 0) {
          this.velocityX *= -1;
          this.targetAngularSpeed *= -1; // Изменяем целевую угловую скорость при столкновении с границей
        }
        if (this.y + this.size > height || this.y - this.size < 0) {
          this.velocityY *= -1;
          this.targetAngularSpeed *= -1; // Изменяем целевую угловую скорость при столкновении с границей
        }

        this.x = Math.max(this.size, Math.min(this.x, width - this.size));
        this.y = Math.max(this.size, Math.min(this.y, height - this.size));

        for (let i = 0; i < particles.length; i++) {
          if (this !== particles[i]) {
            let dx = this.x - particles[i].x;
            let dy = this.y - particles[i].y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 100) {
              let force = (100 - distance) / 100;
              this.x += dx / distance * force * this.density;
              this.y += dy / distance * force * this.density;
              this.targetAngularSpeed *= -1; // Изменяем целевую угловую скорость при столкновении с другой частицей
            }
          }
        }

        // Плавно меняем угловую скорость
        this.angularSpeed += (this.targetAngularSpeed - this.angularSpeed) * 0.1;
        this.angle += this.angularSpeed;
      }
    }

    function init() {
      particles.length = 0;
      for (let i = 0; i < numParticles; i++) {
        let size = getRandomInt(30, 60);
        let x = getRandomInt(0, width);
        let y = getRandomInt(0, height);

        let text = words[getRandomInt(0, words.length)];
        particles.push(new Particle(x, y, size, text));
      }
    }

    function handleResize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      init();
      // скорее всего init надо белать не всегда
    }

    window.addEventListener('resize', handleResize);

    async function animate() {
      ctx.clearRect(0, 0, width, height);
      for (const particle of particles) {
        particle.draw();
        particle.update();
      }
      requestAnimationFrame(animate);
    }

    init();
    animate();
  }
}

export default createParticle();

