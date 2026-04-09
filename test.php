<?php
$oceanos = [
    [
        "nombre" => "Océano Pacífico",
        "area" => "165.25",
        "profundidad" => "4,280",
        "max_profundidad" => "10,994",
        "fosa" => "Fosa de las Marianas",
        "paises" => "55",
        "emoji" => "🌊",
        "color" => "#0077b6",
        "dato" => "El más grande del mundo, cubre más de un tercio de la superficie terrestre.",
        "fauna" => ["Ballena azul", "Tiburón blanco", "Mantarraya gigante", "Pulpo gigante del Pacífico"],
        "curiosidad" => "Contiene más de 25,000 islas, más que todos los demás océanos juntos."
    ],
    [
        "nombre" => "Océano Atlántico",
        "area" => "106.46",
        "profundidad" => "3,332",
        "max_profundidad" => "8,376",
        "fosa" => "Fosa de Puerto Rico",
        "paises" => "41",
        "emoji" => "🫧",
        "color" => "#023e8a",
        "dato" => "Separa América de Europa y África, fue la primera ruta de navegación transatlántica.",
        "fauna" => ["Delfín nariz de botella", "Ballena jorobada", "Atún rojo", "Tortuga laúd"],
        "curiosidad" => "El Atlántico se ensancha aproximadamente 2.5 cm cada año debido a la tectónica de placas."
    ],
    [
        "nombre" => "Océano Índico",
        "area" => "70.56",
        "profundidad" => "3,897",
        "max_profundidad" => "7,187",
        "fosa" => "Fosa de Java",
        "paises" => "37",
        "emoji" => "🐋",
        "color" => "#0096c7",
        "dato" => "El más cálido del mundo y el único con corrientes estacionales que se invierten.",
        "fauna" => ["Dugongo", "Pez vela", "Tortuga verde", "Tiburón ballena"],
        "curiosidad" => "Alberga el 40% de la pesca de alta mar del mundo, vital para millones de personas."
    ],
    [
        "nombre" => "Océano Antártico",
        "area" => "21.96",
        "profundidad" => "3,270",
        "max_profundidad" => "7,235",
        "fosa" => "Fosa de las Sandwich del Sur",
        "paises" => "0",
        "emoji" => "🧊",
        "color" => "#48cae4",
        "dato" => "Reconocido oficialmente en 2000, rodea completamente el continente antártico.",
        "fauna" => ["Pingüino emperador", "Foca leopardo", "Krill antártico", "Orca"],
        "curiosidad" => "Sus aguas son las más productivas del planeta en fitoplancton, base de toda la cadena alimentaria marina."
    ],
    [
        "nombre" => "Océano Ártico",
        "area" => "14.06",
        "profundidad" => "1,205",
        "max_profundidad" => "5,502",
        "fosa" => "Cuenca del Ártico",
        "paises" => "8",
        "emoji" => "❄️",
        "color" => "#90e0ef",
        "dato" => "El más pequeño y superficial, cubierto de hielo la mayor parte del año.",
        "fauna" => ["Oso polar", "Narval", "Morsa", "Beluga"],
        "curiosidad" => "El hielo ártico marino ha disminuido más del 40% en las últimas décadas por el cambio climático."
    ]
];
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Los Océanos del Mundo</title>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet">
    <style>
        :root {
            --deep: #020818;
            --abyss: #030d22;
            --surface: #0a1628;
            --glow: #00b4d8;
            --foam: #caf0f8;
            --biolum: #48cae4;
            --gold: #f4d03f;
            --text: #e8f4f8;
            --muted: #7bb3c9;
        }

        * { margin: 0; padding: 0; box-sizing: border-box; }

        body {
            background-color: var(--deep);
            color: var(--text);
            font-family: 'DM Sans', sans-serif;
            overflow-x: hidden;
        }

        /* Animated ocean background */
        body::before {
            content: '';
            position: fixed;
            inset: 0;
            background:
                radial-gradient(ellipse 80% 50% at 20% 40%, rgba(0,180,216,0.07) 0%, transparent 60%),
                radial-gradient(ellipse 60% 40% at 80% 70%, rgba(72,202,228,0.05) 0%, transparent 50%),
                radial-gradient(ellipse 100% 80% at 50% 100%, rgba(2,62,138,0.3) 0%, transparent 70%);
            pointer-events: none;
            z-index: 0;
        }

        /* Bubbles */
        .bubbles {
            position: fixed;
            inset: 0;
            pointer-events: none;
            z-index: 0;
            overflow: hidden;
        }

        .bubble {
            position: absolute;
            bottom: -50px;
            border-radius: 50%;
            background: radial-gradient(circle at 30% 30%, rgba(255,255,255,0.3), rgba(0,180,216,0.1));
            border: 1px solid rgba(255,255,255,0.15);
            animation: rise linear infinite;
        }

        @keyframes rise {
            0% { transform: translateY(0) scale(1); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 0.5; }
            100% { transform: translateY(-110vh) scale(1.2); opacity: 0; }
        }

        /* ─── HERO ─── */
        .hero {
            position: relative;
            z-index: 1;
            text-align: center;
            padding: 120px 20px 80px;
        }

        .hero-label {
            font-family: 'DM Sans', sans-serif;
            font-size: 0.75rem;
            font-weight: 500;
            letter-spacing: 0.35em;
            text-transform: uppercase;
            color: var(--glow);
            margin-bottom: 24px;
            opacity: 0;
            animation: fadeUp 0.8s ease 0.2s forwards;
        }

        .hero h1 {
            font-family: 'Playfair Display', serif;
            font-size: clamp(3rem, 8vw, 7rem);
            font-weight: 900;
            line-height: 0.95;
            letter-spacing: -0.02em;
            color: var(--foam);
            text-shadow: 0 0 80px rgba(0,180,216,0.4);
            opacity: 0;
            animation: fadeUp 0.8s ease 0.4s forwards;
        }

        .hero h1 span {
            color: var(--glow);
            display: block;
        }

        .hero-desc {
            max-width: 520px;
            margin: 32px auto 0;
            font-size: 1.05rem;
            font-weight: 300;
            color: var(--muted);
            line-height: 1.7;
            opacity: 0;
            animation: fadeUp 0.8s ease 0.6s forwards;
        }

        .stats-row {
            display: flex;
            justify-content: center;
            gap: 60px;
            margin-top: 64px;
            flex-wrap: wrap;
            opacity: 0;
            animation: fadeUp 0.8s ease 0.8s forwards;
        }

        .stat-item {
            text-align: center;
        }

        .stat-num {
            font-family: 'Playfair Display', serif;
            font-size: 2.8rem;
            font-weight: 700;
            color: var(--glow);
            line-height: 1;
        }

        .stat-label {
            font-size: 0.75rem;
            letter-spacing: 0.15em;
            text-transform: uppercase;
            color: var(--muted);
            margin-top: 6px;
        }

        .divider {
            width: 1px;
            height: 60px;
            background: linear-gradient(to bottom, transparent, var(--glow), transparent);
            margin: auto;
        }

        /* ─── SCROLL INDICATOR ─── */
        .scroll-hint {
            position: relative;
            z-index: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 8px;
            padding: 20px;
            color: var(--muted);
            font-size: 0.7rem;
            letter-spacing: 0.2em;
            text-transform: uppercase;
            opacity: 0;
            animation: fadeUp 0.8s ease 1.2s forwards;
        }

        .scroll-line {
            width: 1px;
            height: 40px;
            background: linear-gradient(to bottom, var(--glow), transparent);
            animation: pulse 2s ease infinite;
        }

        @keyframes pulse { 0%,100%{opacity:0.3;} 50%{opacity:1;} }

        /* ─── SECTION TITLE ─── */
        .section-title {
            position: relative;
            z-index: 1;
            text-align: center;
            padding: 80px 20px 40px;
        }

        .section-title h2 {
            font-family: 'Playfair Display', serif;
            font-size: clamp(1.8rem, 4vw, 3rem);
            font-weight: 700;
            color: var(--foam);
        }

        .section-title p {
            color: var(--muted);
            font-weight: 300;
            margin-top: 12px;
            font-size: 1rem;
        }

        /* ─── OCEAN CARDS ─── */
        .cards-container {
            position: relative;
            z-index: 1;
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px 24px 100px;
            display: flex;
            flex-direction: column;
            gap: 40px;
        }

        .ocean-card {
            position: relative;
            background: rgba(255,255,255,0.03);
            border: 1px solid rgba(255,255,255,0.08);
            border-radius: 24px;
            overflow: hidden;
            transition: transform 0.4s ease, box-shadow 0.4s ease, border-color 0.4s ease;
            backdrop-filter: blur(10px);
        }

        .ocean-card:hover {
            transform: translateY(-6px);
            box-shadow: 0 30px 80px rgba(0,0,0,0.5), 0 0 60px rgba(0,180,216,0.1);
            border-color: rgba(0,180,216,0.3);
        }

        .card-accent {
            position: absolute;
            top: 0; left: 0; right: 0;
            height: 3px;
        }

        .card-glow {
            position: absolute;
            top: -100px; right: -100px;
            width: 300px;
            height: 300px;
            border-radius: 50%;
            opacity: 0;
            transition: opacity 0.4s ease;
            pointer-events: none;
        }

        .ocean-card:hover .card-glow { opacity: 0.08; }

        .card-inner {
            padding: 48px;
        }

        .card-header {
            display: flex;
            align-items: flex-start;
            gap: 24px;
            margin-bottom: 36px;
        }

        .card-emoji {
            font-size: 3rem;
            line-height: 1;
            filter: drop-shadow(0 0 20px rgba(0,180,216,0.6));
        }

        .card-title-block { flex: 1; }

        .card-number {
            font-size: 0.65rem;
            letter-spacing: 0.3em;
            text-transform: uppercase;
            color: var(--glow);
            margin-bottom: 8px;
        }

        .card-name {
            font-family: 'Playfair Display', serif;
            font-size: clamp(1.6rem, 3vw, 2.4rem);
            font-weight: 700;
            color: var(--foam);
            line-height: 1.1;
        }

        .card-dato {
            font-size: 0.95rem;
            color: var(--muted);
            font-weight: 300;
            margin-top: 8px;
            line-height: 1.5;
        }

        /* Stats grid */
        .card-stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 1px;
            background: rgba(255,255,255,0.06);
            border-radius: 16px;
            overflow: hidden;
            margin-bottom: 32px;
        }

        .stat-box {
            background: rgba(255,255,255,0.03);
            padding: 24px 20px;
            text-align: center;
        }

        .stat-box-val {
            font-family: 'Playfair Display', serif;
            font-size: 1.6rem;
            font-weight: 700;
            color: var(--foam);
            line-height: 1;
        }

        .stat-box-unit {
            font-size: 0.65rem;
            color: var(--glow);
            margin-left: 3px;
        }

        .stat-box-label {
            font-size: 0.68rem;
            letter-spacing: 0.12em;
            text-transform: uppercase;
            color: var(--muted);
            margin-top: 8px;
        }

        /* Bottom row */
        .card-bottom {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 24px;
        }

        .fauna-block, .curiosidad-block {
            background: rgba(255,255,255,0.03);
            border: 1px solid rgba(255,255,255,0.06);
            border-radius: 16px;
            padding: 24px;
        }

        .block-label {
            font-size: 0.65rem;
            letter-spacing: 0.25em;
            text-transform: uppercase;
            color: var(--glow);
            margin-bottom: 14px;
        }

        .fauna-list {
            list-style: none;
            display: flex;
            flex-direction: column;
            gap: 8px;
        }

        .fauna-list li {
            font-size: 0.85rem;
            color: var(--text);
            font-weight: 300;
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .fauna-list li::before {
            content: '';
            width: 5px; height: 5px;
            border-radius: 50%;
            background: var(--glow);
            flex-shrink: 0;
            box-shadow: 0 0 8px var(--glow);
        }

        .curiosidad-text {
            font-size: 0.9rem;
            font-weight: 300;
            color: var(--muted);
            line-height: 1.65;
            font-style: italic;
        }

        .fosa-tag {
            display: inline-block;
            margin-top: 12px;
            font-size: 0.7rem;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            background: rgba(0,180,216,0.12);
            border: 1px solid rgba(0,180,216,0.25);
            color: var(--glow);
            padding: 5px 12px;
            border-radius: 20px;
        }

        /* ─── FOOTER ─── */
        footer {
            position: relative;
            z-index: 1;
            text-align: center;
            padding: 60px 20px;
            border-top: 1px solid rgba(255,255,255,0.06);
        }

        footer p {
            color: var(--muted);
            font-size: 0.8rem;
            font-weight: 300;
            letter-spacing: 0.08em;
        }

        footer .footer-title {
            font-family: 'Playfair Display', serif;
            font-size: 1.2rem;
            color: var(--foam);
            margin-bottom: 12px;
        }

        /* ─── ANIMATIONS ─── */
        @keyframes fadeUp {
            from { opacity: 0; transform: translateY(24px); }
            to   { opacity: 1; transform: translateY(0); }
        }

        .card-reveal {
            opacity: 0;
            transform: translateY(40px);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }

        .card-reveal.visible {
            opacity: 1;
            transform: translateY(0);
        }

        /* ─── RESPONSIVE ─── */
        @media (max-width: 768px) {
            .card-inner { padding: 28px 20px; }
            .card-header { flex-direction: column; gap: 12px; }
            .card-bottom { grid-template-columns: 1fr; }
            .stats-row { gap: 30px; }
            .divider { display: none; }
        }
    </style>
</head>
<body>

<!-- Bubbles -->
<div class="bubbles" id="bubbles"></div>

<!-- Hero -->
<section class="hero">
    <p class="hero-label">Exploración Marina · <?= date('Y') ?></p>
    <h1>
        Los Océanos
        <span>del Mundo</span>
    </h1>
    <p class="hero-desc">
        El océano cubre el 71% de la superficie terrestre y contiene el 97% del agua de nuestro planeta. Descubre los cinco grandes cuerpos de agua que moldean la vida en la Tierra.
    </p>
    <div class="stats-row">
        <div class="stat-item">
            <div class="stat-num">5</div>
            <div class="stat-label">Océanos</div>
        </div>
        <div class="divider"></div>
        <div class="stat-item">
            <div class="stat-num">71%</div>
            <div class="stat-label">Superficie terrestre</div>
        </div>
        <div class="divider"></div>
        <div class="stat-item">
            <div class="stat-num">3.7km</div>
            <div class="stat-label">Profundidad media</div>
        </div>
        <div class="divider"></div>
        <div class="stat-item">
            <div class="stat-num">97%</div>
            <div class="stat-label">Agua del planeta</div>
        </div>
    </div>
</section>

<div class="scroll-hint">
    <div class="scroll-line"></div>
    Explorar
</div>

<!-- Cards -->
<div class="section-title">
    <h2>Los Cinco Océanos</h2>
    <p>Datos, fauna y curiosidades de cada cuerpo oceánico</p>
</div>

<div class="cards-container">
    <?php foreach ($oceanos as $i => $ocean): ?>
    <div class="ocean-card card-reveal" style="transition-delay: <?= $i * 0.1 ?>s">

        <!-- Top accent bar -->
        <div class="card-accent" style="background: linear-gradient(90deg, <?= $ocean['color'] ?>, transparent)"></div>

        <!-- Glow orb -->
        <div class="card-glow" style="background: radial-gradient(circle, <?= $ocean['color'] ?>, transparent)"></div>

        <div class="card-inner">

            <!-- Header -->
            <div class="card-header">
                <div class="card-emoji"><?= $ocean['emoji'] ?></div>
                <div class="card-title-block">
                    <div class="card-number">Océano <?= str_pad($i + 1, 2, '0', STR_PAD_LEFT) ?></div>
                    <h2 class="card-name"><?= $ocean['nombre'] ?></h2>
                    <p class="card-dato"><?= $ocean['dato'] ?></p>
                </div>
            </div>

            <!-- Stats -->
            <div class="card-stats">
                <div class="stat-box">
                    <div class="stat-box-val"><?= $ocean['area'] ?><span class="stat-box-unit">M km²</span></div>
                    <div class="stat-box-label">Área total</div>
                </div>
                <div class="stat-box">
                    <div class="stat-box-val"><?= $ocean['profundidad'] ?><span class="stat-box-unit">m</span></div>
                    <div class="stat-box-label">Profundidad media</div>
                </div>
                <div class="stat-box">
                    <div class="stat-box-val"><?= $ocean['max_profundidad'] ?><span class="stat-box-unit">m</span></div>
                    <div class="stat-box-label">Profundidad máxima</div>
                </div>
                <?php if ($ocean['paises'] > 0): ?>
                <div class="stat-box">
                    <div class="stat-box-val"><?= $ocean['paises'] ?></div>
                    <div class="stat-box-label">Países costeros</div>
                </div>
                <?php endif; ?>
            </div>

            <!-- Bottom -->
            <div class="card-bottom">
                <div class="fauna-block">
                    <div class="block-label">🐠 Fauna representativa</div>
                    <ul class="fauna-list">
                        <?php foreach ($ocean['fauna'] as $animal): ?>
                        <li><?= $animal ?></li>
                        <?php endforeach; ?>
                    </ul>
                </div>
                <div class="curiosidad-block">
                    <div class="block-label">💡 Curiosidad</div>
                    <p class="curiosidad-text"><?= $ocean['curiosidad'] ?></p>
                    <span class="fosa-tag">📍 <?= $ocean['fosa'] ?></span>
                </div>
            </div>

        </div>
    </div>
    <?php endforeach; ?>
</div>

<!-- Footer -->
<footer>
    <p class="footer-title">Los Océanos del Mundo</p>
    <p>Generado con PHP · <?= date('d/m/Y') ?> · Datos basados en fuentes oceanográficas internacionales</p>
</footer>

<script>
// Generate bubbles
const container = document.getElementById('bubbles');
for (let i = 0; i < 25; i++) {
    const b = document.createElement('div');
    b.className = 'bubble';
    const size = Math.random() * 18 + 4;
    b.style.cssText = `
        width:${size}px; height:${size}px;
        left:${Math.random()*100}%;
        animation-duration:${Math.random()*20+12}s;
        animation-delay:${Math.random()*15}s;
    `;
    container.appendChild(b);
}

// Scroll reveal
const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });

document.querySelectorAll('.card-reveal').forEach(el => observer.observe(el));
</script>
</body>
</html>
