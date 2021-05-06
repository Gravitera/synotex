
H : 고점, L : 저점, C : 종가, O:시가
H : 최근봉 고점, H[1] : 이전 두 번째봉 고점. H[2] : 이전 세 번째봉 고점
var1 : ‘+1’ 출현 횟수
var2 : ‘-1’ 출현 횟수
CL : ‘+1’ 출현 시 최근 종가
CS : ‘-1’ 출현 시 최근 종가 
LL : ‘+1’ 출현 시 L[2]
HH : -1’ 출현 시 H[2]

# 자바스크립트 기반으로 작성되었으며 일부 사용자함수에 대해서는 의뢰자에게 문의




input:N(4),익절(0),손절(0),진입(0),StartTime(070000),EndTime(070000),매매정지(0),lb(0),lp(0),sb(0),sp(0);
//
//  익절, 손절, 진입과 같은 인풋들은 UI 에서 세팅이 가능하도록 가정하에 초기 값들을 0이라고 세팅해두지만 StartTime 을 070000 이라고 초기 세팅은 어떤걸 의미하는지
//
var : LL(0),HH(0),tx1(0),tx2(0),cnt(0),Tx3(0),sum(0),CL(0),CS(0);
Array : VV[20](0);
//
//  여기서 변수들이 예를들어 cnt(0) 이라면 변수는 숫자 형식이며 초기에 0으로 세팅하는지 예: sum(0) 이라면 변수 sum = 0 으로 초기에 세팅
//
//
//  여기서 vv 라는 변수는 길이가 20인 array 인지, 초기에는 길이 20을 0 으로 초기화 하는지 예: vv = [0,0,0,0,0, .... ,0]
//
//
//  여기서 cnt 는 일반 number 숫자 형식인것 같은데 초기에는 cnt = 0 으로 세팅을 하는지 
//
//
//  여기서 tx1, tx2, tx3 라는 변수가 다른 코드에서 쓰여지는곳이 안보임
//

var : Tcond(false),S1(0),D1(0),TM(0),b_vv(0),Condition4(False),최고점(0),최저점(0);


Condition1 = L[4]>L[3] and L[3] >L[2] and H>H[1] and H[1]>H[2];
Condition2 = H[4]<H[3] and H[3]<H[2] and L<L[1] and L[1]<L[2];


if ( ( var2 == 0 and C > CS  and vv[0] == -1 ) or LL == 0 or  C > CL ) and condition1 == true and Condition1[1] == False Then

//
//  여기서 condition1 는 true 아니면 false 값인데 condition1[1] 이 어떤것을 의미하는지
//



{
      var1 = var1+1;
      LL = L[2];
      CL = C;
      


      VV[0] = 1;
      For cnt = 1 to 19
      {
            VV[cnt] = VV[cnt-1][1];
      }

      if VV[N-1] != 0 Then
      {
            sum = 0;
            For cnt = 0 to N-1
            {
                  sum = sum + VV[cnt];
            }

      }
}
else
{
      if L < LL Then
      {         
            var1 = 0;
      }
}     

if (( var1 == 0 and C < CL  and vv[0] ==1) or hh == 0 or C < CS) and condition2 == true and Condition2[1] == False Then

//
//  여기서 condition2 는 true 아니면 false 값인데 condition2[1] 이 어떤것을 의미하는지
//

{
      var2 = var2+1;
      HH = H[2];
      CS = C;
      
      VV[0] = -1;
      For cnt = 1 to 19
      {
            VV[cnt] = VV[cnt-1][1];
      }

      if VV[N-1] != 0 Then
      {
            sum = 0;
            For cnt = 0 to N-1
            {
                  sum = sum + VV[cnt];
            }

	  }
}
Else
{
      if H > HH Then
      {
            var2 = 0;
      }
}

if Bdate != Bdate[1] Then
//
//  여기서 Bdate 라는 변수가 어떻게 계산이 되는지 다른곳에 안나와있음
//
{
     S1 = TimeToMinutes(stime);
     D1 = sdate;
     //
     //  여기서 sdate 라는 변수가 어떻게 계산이 되는지 다른곳에 안나와있음
     //

	 Condition4 = False;
}

if D1 > 0 then
{
      if sdate == D1 Then
            TM = TimeToMinutes(stime)-S1;
      Else
            TM = TimeToMinutes(stime)+1440-S1;
}

if TotalTrades > TotalTrades[1] Then
{
	Condition4 = False;

	if IsExitName("Stoploss",1) == true then 
		Condition4 = true;
	if IsExitName("StopProfittarget",1) == true Then
		Condition4 = true;
}
b_vv = vv[4]+vv[3]+vv[2]+vv[1];
최고점 = highest(h,진입);
최저점 = lowest(l,진입);

if sTime > starttime and sTime < Endtime and  marketposition == 0 Then 
{
		if (b_vv == lb and sum == lp)   Then 
		{
			if 	condition4 == False  Then 
		        Buy("b");
			if (condition4 == true and TM >= TM[BarsSinceExit(1)]+매매정지)  Then 
				Buy("b1");
		}
		if (b_vv == sb and sum == sp)   Then
		{
			if 	condition4 == False  Then 
		        Sell("s");
			if (condition4 == true and TM >= TM[BarsSinceExit(1)]+매매정지)  Then
				Sell("s1");
		}
	
}	

if MarketPosition(0) != 0 and sum ==0 Then
{
	ExitLong();
	ExitShort();

}



#타겟청산
SetStopProfittarget(익절,pointstop);
SetStopLoss( 손절 ,PointStop); 
