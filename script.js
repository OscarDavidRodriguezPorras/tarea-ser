// =============================================
// CLASE: Navegación entre secciones
// =============================================
class NavegadorSecciones {
  constructor() {
    this.secciones = document.querySelectorAll('.seccion');
    this.seccionActual = 'seccion-inicio';
    this._bindEventos();
  }

  _bindEventos() {
    // Inicio → Galería
    document.getElementById('btnComenzar')
      .addEventListener('click', () => this.ir('seccion-galeria'));

    // Galería → Inicio / Telaraña
    document.getElementById('btnVolverInicio')
      .addEventListener('click', () => this.ir('seccion-inicio'));
    document.getElementById('btnIrTelarana')
      .addEventListener('click', () => this.ir('seccion-telarana'));

    // Telaraña → Galería / Plan
    document.getElementById('btnVolverGaleria')
      .addEventListener('click', () => this.ir('seccion-galeria'));
    document.getElementById('btnIrPlan')
      .addEventListener('click', () => this.ir('seccion-plan'));

    // Plan → Telaraña
    document.getElementById('btnVolverTelarana')
      .addEventListener('click', () => this.ir('seccion-telarana'));
  }

  ir(idDestino) {
    const actual = document.getElementById(this.seccionActual);
    const destino = document.getElementById(idDestino);
    if (!destino || actual === destino) return;

    actual.classList.remove('activa');
    destino.classList.add('activa');
    this.seccionActual = idDestino;
  }
}


// =============================================
// CLASE: Slider de imágenes
// =============================================
class SliderImagenes {
  constructor() {
    this.imagenes     = document.querySelectorAll('.slider-img');
    this.indicadores  = document.querySelectorAll('.indicador');
    this.indiceActual = 0;
    this.total        = this.imagenes.length;

    document.getElementById('btnNext')
      .addEventListener('click', () => this.siguiente());
    document.getElementById('btnPrev')
      .addEventListener('click', () => this.anterior());

    this.indicadores.forEach(ind => {
      ind.addEventListener('click', e => {
        this.irA(parseInt(e.target.dataset.idx));
      });
    });
  }

  _actualizar(indice) {
    this.imagenes[this.indiceActual].classList.remove('activa-img');
    this.indicadores[this.indiceActual].classList.remove('activo-ind');

    this.indiceActual = (indice + this.total) % this.total;

    this.imagenes[this.indiceActual].classList.add('activa-img');
    this.indicadores[this.indiceActual].classList.add('activo-ind');
  }

  siguiente()     { this._actualizar(this.indiceActual + 1); }
  anterior()      { this._actualizar(this.indiceActual - 1); }
  irA(indice)     { this._actualizar(indice); }
}


// =============================================
// CLASE: Órbita del Plan de Desarrollo
// (posiciona las 7 imágenes en círculo correcto)
// =============================================
class OrbitaPlan {
  constructor() {
    // CSS maneja todo, no se necesita JS para posicionar
    console.log('Plan de desarrollo listo');
  }
}


// =============================================
// CLASE: Efecto hover del botón Comenzar
// =============================================
class EfectoBotonComenzar {
  constructor() {
    this.btn = document.getElementById('btnComenzar');
    this._bindEventos();
  }

  _bindEventos() {
    this.btn.addEventListener('mouseenter', () => this._onEnter());
    this.btn.addEventListener('mouseleave', () => this._onLeave());
  }

  _onEnter() {
    this.btn.style.letterSpacing = '8px';
    this.btn.style.transition = 'all 0.3s ease';
    this._crearParticula();
  }

  _onLeave() {
    this.btn.style.letterSpacing = '4px';
  }

  _crearParticula() {
    for (let i = 0; i < 6; i++) {
      const sp = document.createElement('span');
      sp.style.cssText = `
        position:fixed;
        width:4px; height:4px;
        border-radius:50%;
        background:var(--dorado);
        pointer-events:none;
        z-index:999;
        box-shadow: 0 0 8px var(--dorado);
      `;
      const rect = this.btn.getBoundingClientRect();
      sp.style.left = (rect.left + Math.random() * rect.width) + 'px';
      sp.style.top  = (rect.top  + Math.random() * rect.height) + 'px';
      document.body.appendChild(sp);

      const dx = (Math.random() - 0.5) * 80;
      const dy = (Math.random() - 0.5) * 80;

      sp.animate([
        { transform: 'translate(0,0) scale(1)', opacity: 1 },
        { transform: `translate(${dx}px,${dy}px) scale(0)`, opacity: 0 }
      ], { duration: 600 + Math.random() * 400, easing: 'ease-out' })
      .onfinish = () => sp.remove();
    }
  }
}


// =============================================
// INICIALIZACIÓN
// =============================================
document.addEventListener('DOMContentLoaded', () => {
  new NavegadorSecciones();
  new SliderImagenes();
  new EfectoBotonComenzar();
  new OverlayImagen();

  // OrbitaPlan se lanza cuando el plan se muestra
  document.getElementById('btnIrPlan').addEventListener('click', () => {
    setTimeout(() => new OrbitaPlan(), 100);
  });
});

// =============================================
// CLASE: Overlay de imagen ampliada
// =============================================
class OverlayImagen {
  constructor() {
    this.overlay = document.getElementById('overlayImagen');
    this.img     = document.getElementById('overlayImg');
    this.cerrar  = document.getElementById('overlayCerrar');
    this._bindEventos();
  }

  _bindEventos() {
    // Click en cualquier imagen del plan
    document.querySelectorAll('.plan-img-item img').forEach(img => {
      img.style.cursor = 'pointer';
      img.addEventListener('click', () => this.abrir(img.src));
    });

    // Cerrar con botón X
    this.cerrar.addEventListener('click', () => this.cerrarOverlay());

    // Cerrar al hacer click fuera de la imagen
    this.overlay.addEventListener('click', e => {
      if (e.target === this.overlay) this.cerrarOverlay();
    });

    // Cerrar con tecla Escape
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') this.cerrarOverlay();
    });
  }

  abrir(src) {
    this.img.src = src;
    this.overlay.classList.add('visible');
  }

  cerrarOverlay() {
    this.overlay.classList.remove('visible');
    setTimeout(() => { this.img.src = ''; }, 400);
  }
}