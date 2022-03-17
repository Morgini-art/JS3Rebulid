function Enemy(enemyX, enemyY, enemyWidth, enemyHeight, enemyHp, enemyObjectiveX, enemyObjectiveY, enemySpeed, enemyDefendChance,
    enemyMinDmg, enemyMaxDmg, enemyDrop, enemyDropAmount, enemyIsAlive = true, enemyAiState = 'none', enemyWeapon, enemyWalkingDirection = 'none') {
    this.enemyX = enemyX;
    this.enemyY = enemyY;
    this.enemyWidth = enemyWidth;
    this.enemyHeight = enemyHeight;
    this.enemyHp = enemyHp;
    this.enemyObjectiveX = enemyObjectiveX;
    this.enemyObjectiveY = enemyObjectiveY;
    this.enemySpeed = enemySpeed;
    this.enemyDefendChance = enemyDefendChance;
    this.enemyMinDmg = enemyMinDmg;
    this.enemyMaxDmg = enemyMaxDmg;
    this.enemyDrop = enemyDrop;
    this.enemyDropAmount = enemyDropAmount;
    this.enemyWeapon = enemyWeapon;
    //Niewymagane argumenty
    this.enemyIsAlive = enemyIsAlive;
    this.enemyAiState = enemyAiState;
    this.enemyWalkingDirection = enemyWalkingDirection;
    //Wszystkich argumentów 16
}
