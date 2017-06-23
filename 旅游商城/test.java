
public static void main(String[] args) {  // TODO Auto-generated method stub  
    Scanner in = new Scanner(System.in);  
    while (in.hasNext()) {  
        int n = in.nextInt();
        int[] arr = new int[n];
        for (int i = 0; i < n; i++) {  
            arr[i] = in.nextInt();  
        }  
        process(arr, n);  
    }  
    in.close();  
    }


    private static void process(int[] arr, int n) {  // TODO Auto-generated method stub

        int maxInterval = -1;//记录原序列间隔的最大值  
        int minNewInterval = Integer.MAX_VALUE;//记录新的最大间隔  
        int [] dp = new int[n-1];//记录相邻两个元素的间隔 

        for(int i = 1; i <= n-1; i++)  {  
            dp[i-1] = arr[i] - arr[i-1];  
            if (dp[i-1]>maxInterval) {  
                maxInterval=dp[i-1];   
            }  
        }  

        //原序列的间隔进行合并相当于删除原素,当大于maxInterval的时候选取最小值  
        for (int i = 0; i < dp.length-1; i++) {  
            int merge = dp[i]+dp[i+1];

            if (merge > maxInterval) {  
                minNewInterval=Math.min(minNewInterval, merge);  
            }  else {  
                minNewInterval=Math.min(minNewInterval, maxInterval);  
            }  
        }

        System.out.println(minNewInterval);  
    }

}