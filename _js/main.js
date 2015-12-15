// particle hero effect
if (document.getElementById('phero')) {
  particleground(document.getElementById('phero'), {
    dotColor: "rgba(255, 255, 255, .4)",
    lineColor: "rgba(255, 255, 255, .12)",
    parallaxMultiplier: 20,
    curvedLines: false,
    particleRadius: 4,
    lineWidth: .5,
    density: 8000, // higher = less
    maxSpeedX: .4,
    maxSpeedY: .4
  });
}
